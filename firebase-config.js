const admin = require("firebase-admin");

const serviceAccount = require("./service-account.js");
// const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;