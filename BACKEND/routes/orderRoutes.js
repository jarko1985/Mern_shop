const express = require("express");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const orderRouter = express.Router();

//Get All Orders
orderRouter.get("/", async (req, res) => {
  let orderList = await Order.find();
  if (!orderList)
    return res.status(500).json({ success: false, message: "No Orders Found" });
  return res.status(200).send(orderList);
});

module.exports = orderRouter;

//Create a new Order

orderRouter.post("/", async (req, res) => {
  const orderItemsIds = req.body.orderItems.map(async (orderItem) => {
    let newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product,
    });
    newOrderItem = await newOrderItem.save();

    return newOrderItem._id;
  });
  let newOrder = new Order({
    orderItems: req.body.orderItems,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    country: req.body.country,
    city: req.body.city,
    zip: req.body.zip,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });
  // newOrder = await newOrder.save();

  if (!newOrder)
    return res
      .status(400)
      .json({ success: false, message: "Cannot Create a new Order" });
  return res.status(200).send(newOrder);
});
