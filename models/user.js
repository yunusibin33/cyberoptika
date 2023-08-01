// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  reference: { type: String, required: true },
  date: { type: String, required: true },
  glass: { type: String, required: true },
  frame: { type: String, required: true },
  price: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
