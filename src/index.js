const express = require("express");
const db = require("./config/database");
const app = express();
const User=require("./models/user")

const cookieParser = require("cookie-parser");

const port = 4623;

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");



app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)




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
