require("dotenv").config();
const assignController = require("express").Router();
const Assign = require("../model/assign");
const Admin = require("../model/admin");
const authenticate = require("../middleware/auth");

assignController.get("/get",authenticate, async (req, res) => {
  try {
    const user = await Assign.find();
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

assignController.get("/getOne/:email",authenticate, async (req, res) => {
  const { email } = req.params;
  try {
    const user = await Assign.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

assignController.post("/create",authenticate, async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (user) {
      const assignUser = await Assign.findOne({ email });
      if (assignUser) {
        res.json({ success: "the student already assigned the " });
      } else {
        var store = await Admin.findOneAndUpdate({ email }, { ...req.body });
        const data = await Assign.create({ ...req.body });
        res.json({ success: "Successfully Assinged", store, data });
      }
    } else {
      res.json({ message: "* Inform the user to create their account" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

assignController.put("/update",authenticate, async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Assign.findOne({ email });
    if (user) {
      await Admin.findOneAndUpdate({ email }, { ...req.body });
      res.json({ success: "User Update Successfully !!!" });
    } else {
      res.json({ message: "There is no user exist to update the account" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});


assignController.put("/updateStu",authenticate, async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Assign.findOne({ email });
    if (user) {
      await Assign.findOneAndUpdate({ email }, { ...req.body });
      await Admin.findOneAndUpdate({ email }, { ...req.body });
      res.json({ success: "User Update Successfully !!!" });
    } else {
      res.json({ message: "there is no user exist to delete the account" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
   


assignController.delete('/del/:email',authenticate,async(req,res)=>{
  const {email}=req.params
  try {
    await Assign.findOneAndDelete({email})
    res.json({message:"Successfully remove"})
    
  } catch (error) {
    res.status(500).json(error.message)
  }

})


module.exports = assignController;
