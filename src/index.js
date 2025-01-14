const express = require("express");
const db = require("./config/database");
const app = express();
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const bycrypt = require("bcrypt");

const port = 4623;
app.use(express.json());
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

app.post("/login", async(req,res)=>{
  
  
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId})
    if(!user){
      res.status(404).send("user not found")

    }
    const isPasswordValid=await bycrypt.compare(password,user.password)

    if(isPasswordValid){
      res.send("login successfull")
    }
    else{
      res.status(400).send("Enter correct password")

    }
   
  }
  catch(err){
    res.status(500).send(err.message)
  }
})

//Get user By Email

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find();
    res.send(feed);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);

    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.send("updated successfully");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.send("user deleted successfully");
    }
  } catch (err) {
    res.status(500).send(err.message);
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
