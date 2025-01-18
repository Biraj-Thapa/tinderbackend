const express = require("express");
const db = require("./config/database");
const app = express();
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const bycrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const port = 4623;
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(404).send("user not found");
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "abcdefghij");
      res.cookie("token", token);
      res.send("login successfull");
    } else {
      res.status(400).send("Enter correct password");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});



db()
  .then(() => {
    console.log("Db connect vayo");
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Db connect vayena");
  });
