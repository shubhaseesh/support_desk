const asyncHandler = require("express-async-handler");
const { validator } = require("../utils/helpers");
const { registerSchema, loginSchema } = require("../utils/schema");



const registerUser = asyncHandler(async (req, res, next) => {
  // validation using joi
  const { error, value } = validator(registerSchema, req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.statusCode = 400;
    return next(validationError);
  }
  res.send({ data: value });
});


const loginUser = asyncHandler(async (req, res, next) => {
  const { error, value } = validator(loginSchema, req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.statusCode = 400;
    return next(validationError);
  }
  res.send({ data: value });
});

module.exports = { registerUser, loginUser };
