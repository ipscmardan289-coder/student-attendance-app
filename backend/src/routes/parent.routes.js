const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Parent = require('../models/Parent');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Notification = require('../models/Notification');

// Get parent profile
router.get('/:id', auth, async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id)
      .populate('userId', 'firstName lastName email phoneNumber')
      .populate('childrenIds');
    
    if (!parent) {
      return res.status(404).json({ success: false, error: 'Parent not found' });
    }
    
    res.json({ success: true, data: parent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get parent's children
router.get('/:parentId/children', auth, async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.parentId).populate('childrenIds');
    
    if (!parent) {
      return res.status(404).json({ success: false, error: 'Parent not found' });
    }
    
    const students = await Student.find({ _id: { $in: parent.childrenIds } })
      .populate('userId')
      .populate('classId');
    
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get child's attendance
router.get('/:parentId/children/:childId/attendance', auth, async (req, res) => {
  try {
    const { month, year } = req.query;
    
    let query = { studentId: req.params.childId };
    
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    const attendance = await Attendance.find(query).sort({ date: -1 });
    
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send notification to parent
router.post('/notify', auth, async (req, res) => {
  try {
    const { parentId, studentId, type, message, channels } = req.body;
    
    const notification = await Notification.create({
      parentId,
      studentId,
      type,
      message,
      notificationChannels: channels || ['email']
    });
    
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
