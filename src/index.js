const express = require("express");
const db = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");

const port = 4623;

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)


app.use(express.json());
app.use(cookieParser());

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
