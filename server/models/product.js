const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ref: {
    type: String,
    required: true,
    unique : true
  },
  size: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  materials: {
    type: [String],
  },
  colors: {
    type: String,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand',
    required: true,
  },
});
module.exports = mongoose.model("product", productSchema);
