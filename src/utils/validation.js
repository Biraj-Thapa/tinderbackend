const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (firstName.length < 4 || firstName.length > 30) {
    {
      throw new Error("First Name should be between 4 to 30 characters");
    }
  } else if (lastName.length < 4 || lastName.length > 30) {
    throw new Error("Last Name should be between 4 to 30 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please Enter  strong Password");
  }
};
 module.exports=validateSignUpData;