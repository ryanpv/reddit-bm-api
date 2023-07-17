const { Category } = require("../../db/db-conn");

const postNewCategory = async (req, res) => {
  try {
    const newObj = {
      userId: "testUser",
      categoryName: "testCategory2"
    }

    const newCategory = new Category(newObj);
    const checkDuplicates = await Category.exists({ userId: "testUser", categoryName: "testCategory2" });

    if (checkDuplicates === null) {
      await newCategory.save();
      console.log("succsessful post")
    };
    res.end();
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

module.exports = postNewCategory