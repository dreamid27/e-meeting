let mongoose = require('mongoose');

let objSchema = new mongoose.Schema({
  name: String,
  code: String,
  description: String,
  sku: String,
  price: Number,
  cost: Number,
  vendor: String,
  expiration_date: Date,
  tags: [String],
  categories: [String],
  stock: Number,
  images: [String]
});

let objModel = mongoose.model('Inventory', objSchema);
module.exports = objModel;