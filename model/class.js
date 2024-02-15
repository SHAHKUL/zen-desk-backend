const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  batch: {
    type: String,
  },
  day: {
    type: Array,
    class: [
      { day: String },
      { link: String },
      { title: String },
      { date: String },
      { content: String },
      { content2: String },
      { activity: String },
    ],
  },
});

const Class = mongoose.model("class", Schema);
module.exports = Class;
