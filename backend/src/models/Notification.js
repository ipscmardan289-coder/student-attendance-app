const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  type: {
    type: String,
    enum: ['absence', 'leave', 'alert', 'reminder'],
    required: true
  },
  title: String,
  message: {
    type: String,
    required: true
  },
  notificationChannels: [
    {
      type: String,
      enum: ['email', 'sms', 'push']
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
  sentAt: Date,
  readAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
