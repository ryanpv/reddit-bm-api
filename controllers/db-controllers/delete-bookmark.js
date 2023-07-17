const { Bookmark } = require("../../db/db-conn");

const deleteBookmark = async (req, res) => {
  try {
    const query = { userId: req.user.uid, _id: req.params.bookmarkId}
    const deleteRequest = await Bookmark.findOneAndDelete(query)
  
    if (deleteRequest !== null) {
      res.send("SUCCESSFUL deletion of bookmark")
    } else {
      res.send("Delete bookmark request was UNSUCCESSFUL")
    }
  } catch (err) {
    res.send(err)
  }
}

module.exports = deleteBookmark