const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  ref: {
    type: String,
    require: true,
  },
  size: {
    type: Number,
    require: true,
  },
  images: {
    type: [String],
    require: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  materials: {
    type: [String],
  },
  color: {
    type: String,
  },
});
module.exports = mongoose.model("product", productSchema);
