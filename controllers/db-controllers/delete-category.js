const { Category, Bookmark } = require("../../db/db-conn.js");

const deleteCategory = async (req, res) => {
  try {
    const query = { userId: req.session.uid, categoryName: req.body.categoryName };
    const delFromCategory = await Category.findOneAndDelete(query);
    const delFromBookmark = await Bookmark.deleteMany(query);
  
    if(delFromCategory === null || delFromBookmark === null) {
      console.log("Cannot find category")
      res.send("Cannot find category")
    } else {
      res.send("SUCCESSFUL category deletion.");
    }
  } catch (err) {
    res.send(err)
  }
};

module.exports = deleteCategory