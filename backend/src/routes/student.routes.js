const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Student = require('../models/Student');

// Get all students
router.get('/', auth, async (req, res) => {
  try {
    const { classId, page = 1, limit = 20 } = req.query;
    
    let query = {};
    if (classId) query.classId = classId;
    
    const students = await Student.find(query)
      .populate('userId', 'firstName lastName email phoneNumber')
      .populate('classId', 'name classCode')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Student.countDocuments(query);
    
    res.json({
      success: true,
      data: students,
      pagination: { page, limit, total: count, pages: Math.ceil(count / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get student by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId')
      .populate('classId')
      .populate('parentIds', 'firstName lastName email phoneNumber');
    
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create student
router.post('/', auth, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { firstName, lastName, email, rollNumber, classId, dateOfBirth, parentIds, address, bloodGroup, emergencyContact } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber: '+1234567890',
        password: 'password123',
        role: 'student'
      });
    }
    
    const student = await Student.create({
      userId: user._id,
      rollNumber,
      classId,
      dateOfBirth,
      parentIds: parentIds || [],
      address,
      bloodGroup,
      emergencyContact
    });
    
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update student
router.put('/:id', auth, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
