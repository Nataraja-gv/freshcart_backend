const Product = require("../models/productModels");
const User = require("../models/userModel");

const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const user = req.user;

    const productIds = cartItems.map((item) => item.item);

    const existingProducts = await Product.find({ _id: { $in: productIds } });

    if (existingProducts.length !== productIds.length) {
      return res.status(400).json({
        message: "Some products in your cart don't exist",
      });
    }

    await User.findByIdAndUpdate(
      { _id: user._id },
      { cartItems },
      { new: true }
    );

    res.status(200).json({
      message: "Cart updated successfully",
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const user = req.user;
    const cartItems = await User.findOne({ _id: user._id })
      .select("cartItems")
      .populate("cartItems.item");
    res.status(200).json({
      message: "user cart details",
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { updateCart, getCartItems };
