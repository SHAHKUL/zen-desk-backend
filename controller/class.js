require("dotenv").config();
const classController = require("express").Router();
const authenticate = require("../middleware/auth");
const Class = require("../model/class");


classController.get("/get",authenticate, async (req, res) => {
  try {
    const user = await Class.find();
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

classController.post("/create",authenticate, async (req, res) => {
  try {
    const data = await Class.create({ ...req.body });
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

classController.put("/update/:id",authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const clas = await Class.findByIdAndUpdate({ _id: id }, { ...req.body });
    res.json(clas);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

classController.delete("/remove/:id",authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const clas = await Class.findByIdAndDelete({ _id: id });
    res.json(clas);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

///each batch class data
classController.get("/eachBatch/:batch",authenticate, async (req, res) => {
  const { batch } = req.params;
  try {
    const clas = await Class.find({ batch});
    res.json(clas);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


module.exports = classController;
