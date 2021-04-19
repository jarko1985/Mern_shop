const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

//Create A New User
userRouter.post("/", async (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
    street: req.body.street,
  });

  newUser = await newUser.save();

  if (!newUser)
    return res
      .status(400)
      .json({ success: false, message: "Couldnt create a new user" });
  res.send(newUser);
});

//Get All Users
userRouter.get("/", async (req, res) => {
  let users = await User.find().select("-passwordHash");
  if (!users)
    return res
      .status(404)
      .json({ success: false, message: "Error while Fetching Users!!" });
  return res.send(users);
});

//Get User By ID
userRouter.get("/:id", async (req, res) => {
  let user = await User.findById(req.params.id).select("-passwordHash");
  if (!user)
    return res.status(404).json({ success: false, message: "User Not Found" });
  return res.send(user);
});

//Register New User
userRouter.post("/register", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});

//User Login
userRouter.post("/login", async (req, res) => {
  //Finding the user by email
  let user = await User.findOne({ email: req.body.email });
  //Getting the Secret from .env File
  const secret = process.env.secret;
  //comparing password with hashedPassword
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    //Creating a Token
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    //If login succeeded return email and Token
    return res.status(200).send({ user: user.email, token: token });
  }
  return res.status(400).send("Password is Wrong!!");
});

//Get Users Count
userRouter.get("/get/count", async (req, res) => {
  let userCount = await User.countDocuments((count) => count);
  if (!userCount) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).send({
    userCount: userCount,
  });
});

//Update User By ID
userRouter.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid User ID");
  }
  // let category = await Category.findById(req.body.category);
  // if (!category) return res.status(400).send("Invalid Category");
  let updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    {
      new: true,
    }
  );
  if (!updatedUser)
    return res
      .status(400)
      .json({ success: false, message: "Cannot be Updated!!" });
  res.status(200).send(updatedUser);
});

//Delete User By ID
userRouter.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product ID");
  }
  try {
    let deletedUser = await User.findByIdAndDelete(req.params.id);
  } catch (err) {
    return res.status(400).send("Cannot be Deleted");
  }
  res.status(200).send("Deleted Successfully!!");
});

module.exports = userRouter;
