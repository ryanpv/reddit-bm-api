const express = require("express");
const bookmarkRouter = express.Router();

bookmarkRouter.route('/')
  .get((req, res) => {
    res.send('home for the bookmarking routes')
  });

module.exports = bookmarkRouter;