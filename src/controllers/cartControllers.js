const User = require("../models/userModel");

const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const user = req.user;

    await User.findByIdAndUpdate({ _id: user._id }, { cartItems });
    res.status(200).json({ message: "cart updated" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = updateCart;
