const { Category } = require("../../db/db-conn");

const getAllCategories = async (req, res) => {
  const projection = { categoryName: 1 };
  const getCategory = await Category.find({ userId: req.user.uid }, projection).sort(projection);

  res.send(getCategory)
}

module.exports = getAllCategories