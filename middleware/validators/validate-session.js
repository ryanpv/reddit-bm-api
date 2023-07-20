const { body } = require("express-validator");

const validateSession = [
  body('accessToken').notEmpty().escape()
];

module.exports = {
  validateSession
}