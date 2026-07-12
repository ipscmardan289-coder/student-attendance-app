const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Notification = require('../models/Notification');

// Mark attendance
router.post('/mark', auth, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { classId, attendanceData, date } = req.body;
    
    const results = [];
    
    for (const record of attendanceData) {
      const attendance = await Attendance.findOneAndUpdate(
        { studentId: record.studentId, date: new Date(date) },
        {
          classId,
          status: record.status,
          remarks: record.remarks,
          markedBy: req.user.id,
          markedAt: new Date()
        },
        { upsert: true, new: true }
      );
      
      results.push(attendance);
      
      // Notify parent if absent
      if (record.status === 'absent') {
        const student = await Student.findById(record.studentId);
        for (const parentId of student.parentIds) {
          await Notification.create({
            parentId,
            studentId: record.studentId,
            type: 'absence',
            message: `Your child was absent on ${date}`,
            notificationChannels: ['email']
          });
        }
      }
    }
    
    res.status(201).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get class attendance
router.get('/records/:classId', auth, async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    
    let query = { classId: req.params.classId };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    if (status) {
      query.status = status;
    }
    
    const records = await Attendance.find(query)
      .populate('studentId', 'rollNumber')
      .sort({ date: -1 });
    
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get student attendance
router.get('/student/:studentId', auth, async (req, res) => {
  try {
    const { month, year } = req.query;
    
    let query = { studentId: req.params.studentId };
    
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    const records = await Attendance.find(query).sort({ date: -1 });
    
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
