// const mongoose = require("mongoose");
// const orderSchema = new mongoose.Schema({
//   transactionnumber: {
//     type: String,
//     required: true,
//   },
//   total: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//     default: Date.now(),
//   },
//   deliverystatus: {
//     type: Boolean,
//     required: true,
//   },
//   products: {
//     type: [{
//         type : mongoose.Schema.Types.ObjectId,
//         ref : "product"
//     }],
//     required : true
//   }
// });
// module.exports = mongoose.model("order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    orderItems: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number },
        image: { type: String, required: true },
        // price: { type: Number, required: true },
        variation : {
          color : {type : String},
          size : {type : String},
          quantity : {type : Number},
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      // location: {
      //   lat: Number,
      //   lng: Number,
      //   address: String,
      //   name: String,
      //   vicinity: String,
      //   googleAddressId: String,
      // },
    },
    // paymentMethod: { type: String, required: true },
    // paymentResult: {
    //   id: String,
    //   status: String,
    //   update_time: String,
    //   email_address: String,
    // },
    // itemsPrice: { type: Number, required: true },
    // shippingPrice: { type: Number, required: true },
    // taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "client" },
    // isPaid: { type: Boolean, default: false },
    // paidAt: { type: Date },
    // isDelivered: { type: Boolean, default: false },
    // deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
