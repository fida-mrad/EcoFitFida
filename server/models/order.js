const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  transactionnumber: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  deliverystatus: {
    type: Boolean,
    required: true,
  },
  products: {
    type: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    }],
    required : true
  }
});
module.exports = mongoose.model("order", orderSchema);
