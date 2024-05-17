const mongoose = require('mongoose');

const doseScheduleSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
});

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    default: null,
  },
  frequency: {
    type: Number,
    default: null,
  },
  frequencyType: {
    type: String,
    enum: ['day', 'week'],
    default: null,
  },
  additionalInfo: {
    type: String,
    default: null,
  },
  doseSchedules: {
    type: [doseScheduleSchema],
    default: [],
  },
  timezone: {
    type: String,
    default: "Asia/Jakarta",
  },
  price: {
    type: Number,
    default: "null",
  },
  currency: {
    type: String,
    default: "idr",
  },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
