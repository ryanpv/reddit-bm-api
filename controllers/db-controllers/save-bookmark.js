const { Bookmark } = require("../../db/db-conn.js");

const saveBookmark = async (req, res) => {
  try {
    const newObj = {
      userId: req.session.uid,
      pathName: req.body.pathName,
      title: req.body.title,
      body: req.body.body,
      link_title: req.body.link_title,
      author: req.body.author,
      subreddit: req.body.subreddit,
      categoryName: req.body.categoryName,
      categoryId: req.body.categoryId,
      over_18: req.body.over_18
    };
    const newBookmark = new Bookmark(newObj);
    await newBookmark.save();

    res.send("Bookmark saved");
  } catch (err) {
    res.send(err);
  }
}

module.exports = saveBookmark