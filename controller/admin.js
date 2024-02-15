require("dotenv").config();
const authController = require("express").Router();
const Admin = require("../model/admin");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Class = require("../model/class");
const authenticate = require("../middleware/auth");

authController.get("/register", async (req, res) => {
  try {
    const user = await Admin.find();
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

authController.get("/getOne/:id",authenticate, async (req, res) => {
  try {
    const user = await Admin.findById({_id:req.params.id});
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

////register page student and mentor
authController.post("/register", async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    if (user) {
      res.json({ message: "Already user exist enter another email id" });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hashsync = bcryptjs.hashSync(req.body.password, salt);
      const newuser = await Admin.create({ ...req.body, password: hashsync });
      res.status(201).json({newuser,register:true});
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

authController.post("/login",async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (user) {
      const compare = bcryptjs.compareSync(password, user.password);

      if (compare) {
        const { password, isAdmin,batch, ...others } = user._doc;
        var token = jwt.sign(
          { id: user._id, name: user.name },
          process.env.key,
          {
            expiresIn: "24h",
          }
        );
        var zenclass=await Class.find({batch})

        res.json({ token, others, isAdmin,zenclass,batch });
      } else {
        res.json({ message: "* Password is not matched" });
      }
    } else {
      res.json({ message: "* There is no registered data" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

authController.put("/task/:id",authenticate, async (req, res) => {
  const { id } = req.params;
  try {
  const user = await Admin.findByIdAndUpdate({ _id: id }, { ...req.body });
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


authController.delete("/remove/:id",authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Admin.findByIdAndDelete({ _id: id });
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});



authController.get("/stuList/",authenticate,async(req,res)=>{
  try {
    const user = await Admin.find({isAdmin:false});
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
})
module.exports = authController;
