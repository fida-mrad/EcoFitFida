const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  startdate: {
    type: Date,
    require: true,
  },
  enddate: {
    type: Date,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  images: {
    type: [String],
    require: true,
  },
  description: {
    type: String,
  }
});
module.exports = mongoose.model("event", eventSchema);
