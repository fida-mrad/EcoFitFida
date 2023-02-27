const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/ecofit",
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeded");
    } else {
      console.log("Error in DB conncection: " + err);
    }
  }
);
