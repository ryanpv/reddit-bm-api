const { Category } = require("../../db/db-conn");

const getAllCategories = async (req, res) => {
  try {
    const projection = { categoryName: 1 };
    // Retrieve all user's categories and sort by ascending order
    const getCategory = await Category.find({ userId: req.session.uid }, projection).sort({ categoryName: "asc" }); 
    
    res.send(getCategory);
  } catch (err) {
    res.send(err);
  }
}

module.exports = getAllCategories