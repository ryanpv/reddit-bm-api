const { Category } = require("../../db/db-conn.js");

const deleteCategory = async (req, res) => {
  try {
    const deleteFunc = await Category.findOneAndDelete({ userId: "testerdeletes", categoryName: "deletes" });
  
    if(deleteFunc === null) {
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