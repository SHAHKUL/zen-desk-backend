const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    batch: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Assign = mongoose.model("assigns", Schema);
module.exports = Assign;
