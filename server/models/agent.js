const mongoose = require("mongoose");
const Brand = new mongoose.Schema(
    {
      brandname: {
        type: String,
        require: true,
      },
    }
  );
const agentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
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
      require: true,
    },
    brand: {
      type: Brand,
      require: true,
    },
    approved: {
      type: Boolean,
      require: true,
      default: false,
    },
    confirmed: {
        type: Boolean,
        require: true,
        default: false,
      },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("agent", agentSchema);
