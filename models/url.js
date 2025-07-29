const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  role :{
   type :String,
   required:true,
   default : "NORMAL",
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{timestamp: { type: Date, default: Date.now }}],
  createdBy : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }
}, { timestamps: true });

// ✅ Prevent OverwriteModelError on hot reload
const URL = mongoose.models.URL || mongoose.model('URL', urlSchema);

module.exports = URL;

