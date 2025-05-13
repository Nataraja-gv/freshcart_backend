const Order = require("../models/ordersmodel");
const Product = require("../models/productModels");
const User = require("../models/userModel");

const reportAllDashboard = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find();
    const products = await Product.find();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    const totalRevenue = orders
      .filter((order) => order.status !== "cancelled")
      .reduce((acc, order) => acc + order.totalAmount, 0);

    const { inStock, outOfStock } = products.reduce(
      (acc, product) => {
        if (product.inStock > 0) {
          acc.inStock += 1;
        } else {
          acc.outOfStock += 1;
        }
        return acc;
      },
      { inStock: 0, outOfStock: 0 }
    );

    const { cod, online } = orders.reduce(
      (acc, item) => {
        if (item.paymentType === "cod") {
          acc.cod += 1;
        } else if (item.paymentType === "online") {
          acc.online += 1;
        }
        return acc;
      },
      { cod: 0, online: 0 }
    );

     

    res.status(200).json({
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers,
      ItemsStocks: {
        inStock,
        outOfStock,
      },
      paymentTypes:{
        cod,
        online
      },
       
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { reportAllDashboard };
