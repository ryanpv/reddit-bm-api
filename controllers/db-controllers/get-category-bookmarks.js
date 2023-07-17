const { Bookmark } = require("../../db/db-conn.js");

const getCategoryBookmarks = async (req, res) => {
  try {
    const query = { userId: req.user.uid , categoryId: req.params.categoryId };
    const docCount = await Bookmark.countDocuments(query);
    const categoryData = await Bookmark
      .find(query)
      .sort(query)
      .skip(req.params.pageNum > 1 ? parseInt(req.params.pageNum) : 0)
      .limit(5);

    res.send({ categoryData: categoryData, docCount: docCount });
  } catch (err) {
    res.send(err)
  }
}

module.exports = getCategoryBookmarks