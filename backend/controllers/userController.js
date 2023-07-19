const asyncHandler = require("express-async-handler");
const { validator, generateToken } = require("../utils/helpers");
const { registerSchema, loginSchema } = require("../utils/schema");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res, next) => {
  // validation using joi
  const {
    error,
    value: { email, password, name },
  } = validator(registerSchema, req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.statusCode = 400;
    return next(validationError);
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    const validationError = new Error("User already exists.");
    validationError.statusCode = 400;
    return next(validationError);
  }
  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // user creation
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    next();
  } else {
    const validationError = new Error("Can not create user.");
    validationError.statusCode = 400;
    return next(validationError);
  }
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
