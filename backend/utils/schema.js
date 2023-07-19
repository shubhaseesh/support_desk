const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(10).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const ticketSchema = Joi.object({
  description: Joi.string().required(),
  status: Joi.string().required(),
  product: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema, ticketSchema };
