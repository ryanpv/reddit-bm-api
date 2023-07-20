const express = require("express");
const bookmarkRouter = express.Router();

// DB CONTROLLERS
const getAllCategories = require("../controllers/db-controllers/get-categories.js");
const postNewCategory = require("../controllers/db-controllers/post-category.js");
const deleteCategory = require("../controllers/db-controllers/delete-category.js");
const getCategoryBookmarks = require("../controllers/db-controllers/get-category-bookmarks.js");
const saveBookmark = require("../controllers/db-controllers/save-bookmark.js");
const queryBookmarks = require("../controllers/db-controllers/query-bookmarks.js");
const deleteBookmark = require("../controllers/db-controllers/delete-bookmark.js");

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
  .get(queryBookmarks) // Query bookmark collection for specific :searchItem

bookmarkRouter.route("/bookmarks")
  .post(saveBookmark) // POST bookmark to a category

bookmarkRouter.route("/remove-bookmark/:bookmarkId")
  .delete(deleteBookmark) // DELETE bookmark from bookmark collection


module.exports = bookmarkRouter;