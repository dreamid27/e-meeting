let mongoose = require('mongoose');

let partnerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: { type: Date, default: Date.now, required:true  },
  status: {type: Number, default: 0, required:true },
  type: {type: String, default: 'taaruf', required: true},
  location: {type: String},
  is_deleted: {
    type: Boolean,
    required: true,
    default: false
  }
});

let partnerModel = mongoose.model('Partner', partnerSchema);

module.exports = partnerModel;