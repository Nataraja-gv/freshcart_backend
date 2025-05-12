const Address = require("../models/addressModel");
const Order = require("../models/ordersmodel");
const Product = require("../models/productModels");

const PlacePurchaseOrder = async (req, res) => {
  try {
    const user = req.user;
    const { items, address, paymentType, isPaid } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const validAddress = await Address.findById(address);
    if (!validAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    const paymentTypes = ["cod", "online"];

    if (paymentType && !paymentTypes.includes(paymentType)) {
      return res
        .status(400)
        .json({ message: "Invalid payment type. Choose 'cod' or 'online'" });
    }

    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.item);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.item} not found` });
      }
      totalAmount += product.offerPrice * item.quantity;
    }

    tax = (totalAmount * 2) / 100;
    totalAmount += tax;
    const order = new Order({
      userId: user._id,
      items: items.map((item) => ({
        item: item.item,
        quantity: item.quantity,
      })),
      totalAmount: totalAmount,
      address: address,
      paymentType: paymentType,
      isPaid: isPaid,
    });

    const response = await order.save();
    if (!response) {
      return res.status(500).json({ message: "Failed to place order" });
    }

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const sellerUser = req.seller;
    if (!sellerUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const orders = await Order.find()
      .populate("items.item")
      .populate("address")
      .populate("userId");
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res
      .status(200)
      .json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const orders = await Order.find({ userId: user._id })
      .populate("items.item")
      .populate("address")
      .populate("userId");
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res
      .status(200)
      .json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { PlacePurchaseOrder, getAllOrder, getUserOrders };
