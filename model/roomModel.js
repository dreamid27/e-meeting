let mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
  name_room: String,
  description: String,
  capacity: Number,
  image_room: String,
  active: Boolean
});

let roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;