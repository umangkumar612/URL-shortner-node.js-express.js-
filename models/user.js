const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// ✅ Use the correct model name and guard against redefinition
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
