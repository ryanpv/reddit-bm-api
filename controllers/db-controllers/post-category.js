const { Category } = require("../../db/db-conn");

const postNewCategory = async (req, res) => {
  try {
    const newObj = {
      userId: req.session.uid,
      categoryName: req.body.categoryName
    };

    const newCategory = new Category(newObj);
    const checkDuplicates = await Category.exists({ userId: req.session.uid, categoryName: req.body.categoryName });

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