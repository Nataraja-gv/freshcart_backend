const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
