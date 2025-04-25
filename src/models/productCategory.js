const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique: true,
  },
  category_image: {
    type: String,
    required: [true, "Category image URL is required"],
  },
}, { timestamps: true });

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);