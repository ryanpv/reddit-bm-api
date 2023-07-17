const express = require("express");
const bookmarkRouter = express.Router();
const { Category } = require("../db/db-conn.js");

// DB CONTROLLERS
const getAllCategories = require("../controllers/db-controllers/get-categories.js");
const postNewCategory = require("../controllers/db-controllers/post-category.js");

bookmarkRouter.route('/')
  .get((req, res) => {
    res.send('home for the bookmarking routes')
  });


bookmarkRouter.route("/category-list")
  .get(getAllCategories) // GET LIST OF ALL CATEGORIES
  .post(postNewCategory); // POST NEW CATEGORY



bookmarkRouter


module.exports = bookmarkRouter;