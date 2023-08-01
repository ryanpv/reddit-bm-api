const { Bookmark } = require("../../db/db-conn.js");

const queryBookmarks = async (req, res) => {
  try {
    // Non-case sensitive text search
    const query = { '$text': { '$search' : `\"${req.params.searchItem}\"` }, userId: req.session.uid };
    const projection = { categoryName: 1, pathName: 1, title: 1, link_title: 1 };
    const searchBookmarks = await Bookmark.find(query, projection);

    res.send(searchBookmarks);
  } catch (err) {
    res.send(err);
  }
}

module.exports = queryBookmarks