let mongoose = require('mongoose');

let physicalImageSchema = new Schema(
  { gender: String,manhaj: String,skin_color: String,eye_color: String });


let profileSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  company: String,
  manhaj: String,
  born_date: String,
  gender: String,
  id_card: String,
  status_marriage: Number,
  born_city: String,
  anak_ke: Number,
  domisili_city: String,
  from_city: String,
  suku: String,
  marriage_permission: Number,
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
  },
  physical_Image: physicalImageSchema
});

let profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;