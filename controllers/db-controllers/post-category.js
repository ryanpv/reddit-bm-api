const { Category } = require("../../db/db-conn");

const postNewCategory = async (req, res) => {
  try {
    const newObj = {
      // userId: req.user.uid,
      userId: "testerdeletes",
      // categoryName: req.body.categoryName
      categoryName: "deletes"
    };

    const newCategory = new Category(newObj);
    // const checkDuplicates = await Category.exists({ userId: req.user.uid, categoryName: req.body.categoryName });
    const checkDuplicates = await Category.exists({ userId: "testerdeletes", categoryName: "deletes" });

    if (checkDuplicates === null) {
      await newCategory.save();
      console.log("succsessful post")
    } else {
      res.send("Category already exists")
    }
    res.end();
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

module.exports = postNewCategory