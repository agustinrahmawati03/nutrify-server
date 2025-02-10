const mongoose = require('mongoose');
const { Schema } = mongoose;

const reminderSchema = new Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'User',
    },
    email: {
      type: String,
      required: true,
    },
    replacer: {
      type: Object,
      required: false,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const reminderModel = mongoose.model('Reminder', reminderSchema);
module.exports = reminderModel;
