const express = require("express");
const Category = require("../models/Category");
const productRouter = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");

//Get All Products
productRouter.get(`/`, async (req, res) => {
  //Filter
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  let productList = await Product.find(filter).populate("category");
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

//Get Product By ID
productRouter.get("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product Not Found!!" });
  } else return res.status(200).send(product);
});

//Get Product Count
productRouter.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);

  if (!productRouter) {
    return res
      .status(400)
      .json({ success: false, message: "Cannot get Count of Products" });
  }

  res.status(200).send({
    productCount: productCount,
  });
});

//Get Fetured Products
productRouter.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const featuredProducts = await Product.find({ isFeatured: true }).limit(
    parseInt(count)
  );
  if (!featuredProducts)
    res
      .status(500)
      .json({ success: false, message: "Cannot get featured products" });
  res.send(featuredProducts);
});

//Add a New Product
productRouter.post(`/`, async (req, res) => {
  let category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  product = await product.save();

  if (!product) {
    return res
      .status(400)
      .send({ success: false, message: "Product Cannot be created" });
  } else {
    return res.send(product);
  }
});

//Update Product By ID
productRouter.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product ID");
  }
  let category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");
  let updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );
  if (!updatedProduct)
    return res
      .status(400)
      .json({ success: false, message: "Cannot be Updated!!" });
  res.status(200).send(updatedProduct);
});

//Delete Product By ID
productRouter.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product ID");
  }
  try {
    let deletedProduct = await Product.findByIdAndDelete(req.params.id);
  } catch (err) {
    return res.status(400).send("Cannot be Deleted");
  }
  res.status(200).send("Deleted Successfully!!");
});

module.exports = productRouter;
