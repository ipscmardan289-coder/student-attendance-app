const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  classCode: {
    type: String,
    required: true,
    unique: true
  },
  grade: String,
  section: String,
  teacherIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  studentCount: {
    type: Number,
    default: 0
  },
  capacity: {
    type: Number,
    default: 50
  },
  academicYear: {
    type: String,
    default: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1)
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Class', classSchema);
