const express = require("express");
const Category = require("../models/Category");

const categoryRouter = express.Router();

//Get All Categories
categoryRouter.get(`/`, async (req, res) => {
  let categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

// Get Category By ID
categoryRouter.get("/:id", async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(500).json({
      success: false,
      message: "The Caterory with the given ID was not found",
    });
  }

  return res.status(200).send(category);
});

//Post A New Category
categoryRouter.post(`/`, async (req, res) => {
  let newCategory = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  newCategory = await newCategory.save();
  if (!newCategory) {
    return res.status(404).send("Category cannot be created!!");
  }
  res.send(newCategory);
});

//Update Category by ID
categoryRouter.put("/:id", async (req, res) => {
  let updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  );
  if (!updatedCategory) {
    return res.status(404).send("Category cannot be updated!!");
  }
  res.send(updatedCategory);
});

//Delete Category by ID
categoryRouter.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "Record Deleted Successfully" });
      } else
        return res
          .status(404)
          .json({ success: false, message: "Category Not Found!!" });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = categoryRouter;
