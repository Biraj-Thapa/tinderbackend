const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,

    required: true,
    minLength:3,
    maxLength:30
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18
  },
  gender: {
    type: String,
    validates(value){
      if(![male,female,others].includes(value)){
        throw new Error("Invalid Gender")
      }
    }
   },
  photoUrl: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTez7DIj3Ult4CMzCovte3pwj6AmTo8HDTCRQ&s",
  },
  about: {
    type: String,
    default: "This is about user",
  },
  skills: {
    type: [String],
  },
},{timestamps:true});

userSchema.method.getJWT=async function (){
  const user=this;
  const token = await jwt.sign({ _id: user._id }, "abcdefghij");
  return token
}

const User = mongoose.model("User", userSchema);
module.exports = User;
