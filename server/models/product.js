const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
      required: true,
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const variantSchema = new mongoose.Schema({
  color: { type: String },
  image: { type: String },
  size: [
    {
      name: { type: String },
      stock: { type: Number },
    },
  ],
});
const productSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  // sku: { type: String },
  // ref: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  name: { type: String },
  price: { type: Number },
  discount: { type: Number, required: false },
  offerEnd: { type: Date, required: false },
  new: { type: Boolean, required: false },
  // rating: { type: Number, required: false },
  saleCount: { type: Number, required: false, default: 0 },
  // quantity: { type: Number },
  // size: { type: String },
  category: { type: [String], required: false },
  tag: { type: [String], required: false },
  variation: {
    type: [
      {
        color: { type: String },
        size: [
          {
            name: { type: String },
            stock: { type: Number },
          },
        ],
      },
    ],
  },
  image: {
    type: [String],
    required: true,
  },
  reviews: [reviewSchema],
  shortDescription: { type: String },
  fullDescription: { type: String },
  materials: {
    type: [
      {
        name: { type: String },
        percentage: { type: Number },
      },
    ],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
