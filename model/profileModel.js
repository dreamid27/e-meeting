let mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({
  full_name: String,
  first_name: String,
  last_name: String,
  company: String,
  religion: String,
  manhaj: String,
  date_birth: String,
  gender: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  in_relation: {
    type: Number,
    required: true,
    default: 0
  },
  detail_relation: {
    type: { 
      type: String
    },
    partner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }
});

let profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;