const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    profileimg: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    tfaSecret :{
      type : String ,
      required : false
    },
    tfa : {
      type : Boolean,
      required : true,
      default : false
    },
    role: {
      type: String,
      required: true,
      default: "Client",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("client", clientSchema);
