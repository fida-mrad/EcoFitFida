const mongoose = require("mongoose");
const Admin = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profileimg: {
    type: String,
    require: false,
  }
});
module.exports = mongoose.model("admin", Admin);
