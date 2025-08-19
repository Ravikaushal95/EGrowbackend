const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  profile: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userTbl = mongoose.model('user', userSchema);
module.exports = userTbl;
