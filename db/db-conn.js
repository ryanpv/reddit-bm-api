const mongoose = require("mongoose");

const mongooseConn = mongoose.connect(
  process.env.DB_URI, {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongooose connection error: "));
db.once("open", () => {
  console.log("Mongoose connection successful!");
});

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  pathName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  link_title: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: true
  },
  subreddit: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  },
  over_18: {
    type: String,
    required: true
  },
});

const categorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  }
});

bookmarkSchema.index({ "$**" : "text" });

const Bookmark = mongoose.model("bookmarks", bookmarkSchema);
const Category = mongoose.model("categories", categorySchema)

module.exports = {
  mongooseConn,
  db,
  Bookmark,
  Category
}