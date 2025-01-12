const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      required: true,
    },
    min_bbi: {
      type: Number,
      required: true,
    },
    max_bbi: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      maxlength: 255,
      required: true,
    },
    description: {
      type: String,
      maxlength: 1000,
      required: true,
    },
  },
  {
    timestamps: true, // Menambahkan createdAt dan updatedAt otomatis
    versionKey: false, // Menghilangkan field __v
  }
);

const exerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = exerciseModel;
