const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    birthdate: {
      type: Date,
      require: true,
    },
    profileimg: {
      type: String,
      require: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("client", clientSchema);
