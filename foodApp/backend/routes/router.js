require("dotenv").config(); // Load environment variables
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;  // Use .env variable

const User = require("../models/Users");
const Order = require("../models/Orders");

router.use(express.json());

//POST - Create User
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const { name, location, email, password } = req.body;
      const newUser = new User({
        name,
        location,
        email,
        password: secPassword,
      });
      await newUser.save();
      res.status(200).json({
        success: true,
        user: newUser,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    }
  }
);

//POST - Login User
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      const email = req.body.email;
      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: "Try logging in with correct email" });
      }

      const passwordCompare = await bcrypt.compare(req.body.password, userData.password);

      if (!passwordCompare) {
        return res.status(400).json({ errors: "Try logging in with correct password" });
      }

      const data = { user: { id: userData.id } };
      const authToken = jwt.sign(data, jwtSecret);  // Use .env JWT Secret

      return res.json({ success: true, authToken });
    } catch (err) {
      res.status(500).json({ message: err.message, success: false });
    }
  }
);

//POST - Food Data
router.post("/foodData", (req, res) => {
  try {
    res.send([global.FoodList, global.FoodCategory]);
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

//POST - Order Data
router.post("/orderData", async (req, res) => {
  const { email, order_data, order_date } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const userOrders = await Order.findOne({ email });

    if (!userOrders) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    if (order_data && order_date) {
      order_data.splice(0, 0, { Order_date: order_date });
      await Order.findOneAndUpdate({ email }, { $push: { order_data: order_data } });
      return res.json({ success: true, message: "Order added" });
    }

    return res.json({ success: true, orderData: userOrders });
  } catch (err) {
    console.error("Error processing order:", err.message);
    return res.status(500).json({ message: "Server Error: " + err.message });
  }
});

module.exports = router;
