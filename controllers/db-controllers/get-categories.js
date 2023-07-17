const { Category } = require("../../db/db-conn");

const getAllCategories = async (req, res) => {
  try {
    const projection = { categoryName: 1 };
    const getCategory = await Category.find({ userId: req.user.uid }, projection).sort({ categoryName: "asc" });
  
    res.send(getCategory);
  } catch (err) {
    res.send(err);
  }
}

module.exports = getAllCategories