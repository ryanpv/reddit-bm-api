const express = require("express");
const bookmarkRouter = express.Router();
const { Category } = require("../db/db-conn.js");

// DB CONTROLLERS
const getAllCategories = require("../controllers/db-controllers/get-categories.js");
const postNewCategory = require("../controllers/db-controllers/post-category.js");
const deleteCategory = require("../controllers/db-controllers/delete-category.js");
const getCategoryBookmarks = require("../controllers/db-controllers/get-category-bookmarks.js");
const saveBookmark = require("../controllers/db-controllers/save-bookmark.js");

bookmarkRouter.route('/')
  .get((req, res) => {
    res.send('home for the bookmarking routes')
  });

// CATEGORIES ROUTES
bookmarkRouter.route("/category-list")
  .get(getAllCategories) // GET list of all categories
  .post(postNewCategory) // POST new category
  .delete(deleteCategory) // DELETE all docs that include the category name from all collections

// BOOKMARKS ROUTES
bookmarkRouter.route("/category-list/:categoryId/:pageNum")
  .get(getCategoryBookmarks) // GET all bookmarks stored in category

bookmarkRouter.route("/bookmarks/:searchItem")
  .get()

bookmarkRouter.route("/bookmarks")
  .post(saveBookmark) // POST bookmark to a category


bookmarkRouter


module.exports = bookmarkRouter;