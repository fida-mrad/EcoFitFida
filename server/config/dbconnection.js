const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://0.0.0.0:27017/ecoFit",
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeded");
    } else {
      console.log("Error in DB conncection: " + err);
    }
  }
);
