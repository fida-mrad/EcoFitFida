const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  transactionnumber: {
    type: String,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  deliverystatus: {
    type: Boolean,
    require: true,
  },
  products: {
    type: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    }],
    require : true
  }
});
module.exports = mongoose.model("order", orderSchema);
