const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    ProductImages: {
      type: Array,
      required: true,
    },
    description: {
      type:String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      ref: "ProductCategory",
      required: true,
    },
    inStack:{
        type:Boolean,
        default:true
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
