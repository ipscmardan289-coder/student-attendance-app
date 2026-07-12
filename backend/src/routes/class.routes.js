const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Class = require('../models/Class');
const Student = require('../models/Student');

// Get all classes
router.get('/', auth, async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('teacherIds', 'firstName lastName email');
    
    res.json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get class by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate('teacherIds', 'firstName lastName email');
    
    if (!classData) {
      return res.status(404).json({ success: false, error: 'Class not found' });
    }
    
    res.json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get class students
router.get('/:id/students', auth, async (req, res) => {
  try {
    const students = await Student.find({ classId: req.params.id })
      .populate('userId', 'firstName lastName email');
    
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create class
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { name, classCode, grade, section, capacity, academicYear } = req.body;
    
    const classData = await Class.create({
      name,
      classCode,
      grade,
      section,
      capacity,
      academicYear
    });
    
    res.status(201).json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
