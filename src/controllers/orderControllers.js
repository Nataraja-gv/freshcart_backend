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
    let limit = parseInt(req.query.limit || 2);
    let page = parseInt(req.query.page || 1);
    limit = limit > 15 ? 15 : limit;
    skip = (page - 1) * limit;

    if (!sellerUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find()
      .populate("items.item")
      .populate("address")
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    const totalPages = Math.ceil(totalOrders / limit);
    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
      totalOrders,
      totalPages,
      recordPerPage: limit,
      currectPage: page,
    });
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
      .populate("userId")
      .sort({ createdAt: -1 })
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

const chanageOrderStatus = async (req, res) => {
  try {
    const { status, isPaid } = req.body;
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    if (!status) {
      return res
        .status(400)
        .json({ message: "isPaid and status are required" });
    }

    const validStatus = ["pending", "shipped", "delivered", "cancelled"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Choose 'pending', 'shipped', 'delivered', or 'cancelled'",
      });
    }
    const order = await Order.findById({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    order.isPaid = isPaid;
    await order.save();
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  PlacePurchaseOrder,
  getAllOrder,
  getUserOrders,
  chanageOrderStatus,
};
