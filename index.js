require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authController = require("./controller/admin");
const assignController = require("./controller/assign");
const classController = require("./controller/class");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/auth", authController);
app.use("/user", assignController);
app.use("/class", classController);

mongoose
  .connect(process.env.mongo_URL)
  .then(() => {
    app.listen(process.env.Port, () => {
      console.log("server conneted", process.env.Port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "server running successfully!!!" });
});
