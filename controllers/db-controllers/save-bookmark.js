const { Bookmark } = require("../../db/db-conn.js");

const saveBookmark = async (req, res) => {
  try {
    const newObj = {
      userId: "bookmarkUser",
      pathName: "www.bookark.com",
      title: "randome title",
      body: "some body content",
      link_title: "link title",
      author: "redditauthor",
      subreddit: "randomsub",
      categoryName: "testCategory",
      categoryId: "categoryId",
      over_18: "false"
    }
    const newBookmark = new Bookmark(newObj);
    const saveBookmark = await newBookmark.save();
  
    console.log('saving: ', saveBookmark)
    res.send("Bookmark saved")
  } catch (err) {
    res.send(err)
  }
}

module.exports = saveBookmark