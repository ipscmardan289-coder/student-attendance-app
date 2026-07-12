const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  occupation: String,
  relationship: {
    type: String,
    enum: ['mother', 'father', 'guardian']
  },
  childrenIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }
  ],
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true },
    notifyOnAbsence: { type: Boolean, default: true },
    notifyOnLeave: { type: Boolean, default: false }
  },
  addressProof: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Parent', parentSchema);
