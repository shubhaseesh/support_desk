const jwt = require("jsonwebtoken");

const validator = (schema, payload) => schema.validate(payload);


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};



module.exports = { validator, generateToken };
