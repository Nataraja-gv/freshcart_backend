const productCategory = require("../models/productCategory");
const ProductCategory = require("../models/productCategory");

const CategoryController = async (req, res) => {
  try {
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existingCategory = await ProductCategory.findOne({ category_name });

    if (existingCategory) {
      return res.status(400).json({ message: "category already exist" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Category image is required" });
    }

    const categoryData = new ProductCategory({
      category_name,
      category_image: req.file.location,
    });

    const savedCategory = await categoryData.save();

    res.status(201).json({
      message: "Category added successfully",
      data: savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to add category",
    });
  }
};

const GetAllCategory = async (req, res) => {
  try {
    const categories = await productCategory.find();
     res.status(200).json({
      message: "All categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to add category",
    });
  }
};

module.exports = { CategoryController,GetAllCategory  };
