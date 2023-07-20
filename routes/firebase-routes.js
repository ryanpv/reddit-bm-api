const express = require("express");
const firebaseRouter = express.Router();
// Route validators
const { validateSession } = require("../middleware/validators/validate-session.js");
// Route controllers
const { setUserClaims } = require("../middleware/set-user-claims");
const sessionStart = require("../middleware/user-session.js");

firebaseRouter.route("/login-session")
  .post(validateSession, setUserClaims, sessionStart)

module.exports = firebaseRouter