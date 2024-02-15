const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    batch: {
      type: String,
    },
    education: {
      type: String,
    },
    phone: {
      type: String,
    },
    year: {
      type: String,
    },
    task: {
      type: Array,
      detail: [
        {
          day: { type: String },
          name: { type: String },
          title: { type: String },
          frontend: { type: String },
          backend: { type: String },
          mark: { type: Number },
          comment: { type: String },
          created: { type: String },
        },
      ],
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

const Admin = mongoose.model("admins", Schema);
module.exports = Admin;
