const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      maxlength: 100,
      required: true,
    },
    email: {
      type: String,
      maxlength: 150,
      required: true,
    },
    gender: {
      type: String,
      enum: ['pria', 'wanita'],
    },
    status: {
      type: String,
      maxlength: 150,
      required: true,
    },
    password: {
      type: String,
      maxlength: 255,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    tinggi: {
      type: Number,
      maxlength: 3,
    },
    berat: {
      type: Number,
      maxlength: 3,
    },
    umur: {
      type: Number,
      maxlength: 3,
    },
    caloriNeeded: {
      type: Number,
    },
    proteinNeeded: {
      type: Number,
    },
    fatNeeded: {
      type: Number,
    },
    carboNeeded: {
      type: Number,
    },
    levelActivity: {
      type: Number,
      required: true,
    },
    bbi: {
      type: Object,
    },
    resetPassword:{
      lastSent: Date,
      resetAttempts: Number,
      verifyAttempts: Number,
      verifyCode: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
