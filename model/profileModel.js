let mongoose = require('mongoose');

let physicalImageSchema = new mongoose.Schema({ 
  bentuk_fisik: String,
  skin_color: String,
  eye_color: String,
  hair_color: String,
  hair_type: String,
  height: Number,
  weight: Number,
  favorite_sport: String,
  history_medical: String,
  ciri_khas: String,
  cacat_fisik: String
});

let selfImageSchema = new mongoose.Schema({ 
  moto: String,
  life_target: String,
  appreciation: String,
  hobby: String,
  activities_in_freetime: String,
  things_like: Number,
  positive_nature: Number,
  negative_nature: String,
  opinion_poligami: String
});

let familySchema = new mongoose.Schema({ 
  relation: String,
  job: String,
  age: Number,
  religion: String,
  education: String,
});

let educationSchema = new mongoose.Schema({ 
  education_level: String,
  spesialis: String,
  start_year: Number,
  end_year: Number
});

let experienceSchema = new mongoose.Schema({ 
  experience_type: String,
  position: String,
  company: String,
  start_year: Number,
  end_year: Number
});

let praySchema = new mongoose.Schema({ 
  pray_type: String,
  description: String,
});


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
  physical_image: physicalImageSchema,
  self_image: selfImageSchema,
  families: [familySchema],
  educations: [educationSchema],
  experiences: [experienceSchema],
  prays: [praySchema]
});

let profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;