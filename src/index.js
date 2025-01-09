const express = require("express");
const db = require("./config/database");
const app = express();
const User = require("./models/user");

const port = 4623;
app.use(express.json());
app.post("/signup", async (req, res) => {
  //creating new instance of user model
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send("user added successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

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
  const userId=req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({_id:userId},data);

    if (!user) {
        res.status(400).send("user not found")
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
