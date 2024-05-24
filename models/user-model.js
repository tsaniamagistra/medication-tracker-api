const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'https://storage.cloud.google.com/med-tracker-bucket/default-pp.jpg',
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
