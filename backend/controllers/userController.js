const asyncHandler = require("express-async-handler");
const { validator } = require("../utils/helpers");
const { generateToken } = require("../utils/jwt");
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
  // hash password for new user registration
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
    // next();
  } else {
    const validationError = new Error("Can not create user.");
    // 400 statusCode for bad request
    validationError.statusCode = 400;
    return next(validationError);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const {
    error,
    value: { email, password },
  } = validator(loginSchema, req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.statusCode = 400;
    return next(validationError);
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    const validationError = new Error("Either email or password is incorrect.");
    // 401 for unauthorised access
    validationError.statusCode = 401;
    next(validationError);
  }
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = { id: req.user._id, name: req.user.name, email: req.user.email };
  res.status(200).json(user);
});

module.exports = { registerUser, loginUser, getCurrentUser };
