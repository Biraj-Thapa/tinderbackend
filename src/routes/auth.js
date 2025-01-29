const express = require("express");
const authRouter = express.Router();
const bycrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const validateSignUpData = require("../utils/validation")
const User = require("../models/user");


authRouter.post("/signup", async (req, res) => {
  //creating new instance of user model
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const hashedPassword = await bycrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send("user added successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(404).send("user not found");
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = await jwt.getJWT();
      res.cookie("token", token);
      res.send("login successfull");
    } else {
      res.status(400).send("Enter correct password");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = authRouter;
