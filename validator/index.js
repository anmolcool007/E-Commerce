const { validationResult, check } = require("express-validator");

//note: Enter error message after each check to avoid errors

const validator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),
  
  check("email")
    .isEmail()
    .withMessage("Enter a valid E-mail address")
    //.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .isLength({ min: 3, max: 100 })
    .withMessage("Enter E-Mail address with less than 100 characters"),
  
    check("password")
    .notEmpty()
    .withMessage("Enter a valid Password")
    .matches(/\d/)
    .withMessage("Password must contain atleast one number")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const result = (req, res, next) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();

  if (hasError) {
    const error = result.array()[0].msg;
    res.status(400);
    next(error);
  } else {
    next();
  }
};

module.exports = {
  validator,
  result,
};