const productCategory = require("../models/productCategory");
const Product = require("../models/productModels");
const productRouter = require("../routers/productRouter");

const ProductAddControllers = async (req, res) => {
  try {
    const { productName, description, price, offerPrice, category, inStack } =
      req.body;

    const validFields = [
      "productName",
      "description",
      "price",
      "offerPrice",
      "inStack",
      "ProductImages",
      "category",
    ];

    const invalidFields = Object.keys(req.body).filter(
      (field) => !validFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid field(s): ${invalidFields.join(", ")}` });
    }

    if (req.files.length === 0) {
      return res.status(400).json({ message: "Product image is required" });
    }

    if (!productName || !description || !price || !offerPrice || !category) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({
        message: `${existingProduct.productName} product already exist`,
      });
    }

    const validCategory = await productCategory.findById(category);
    if (!validCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    if (Number(price) <= Number(offerPrice)) {
      return res
        .status(400)
        .json({ message: "Offer price less than Product Price" });
    }

    let inStackValue = inStack;
    if (typeof inStack === "string") {
      if (inStack.toLowerCase() === "true") {
        inStackValue = true;
      } else if (inStack.toLowerCase() === "false") {
        inStackValue = false;
      } else {
        return res
          .status(400)
          .json({ message: "inStack must be true or false" });
      }
    }

    if (typeof inStackValue !== "boolean") {
      return res.status(400).json({ message: "inStack must be true or false" });
    }

    const images = req.files.map((item) => ({
      image_link: item.location,
    }));

    const data = {
      productName,
      description,
      price,
      offerPrice,
      category,
      inStack,
      ProductImages: images,
    };

    const ProductData = await Product(data);

    const response = await ProductData.save();

    res.status(200).json({
      message: `${productName} product is saved sucessfully`,
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const ProductsAllControllers = async (req, res) => {
  try {
    const responseAllData = await Product.find().populate("category");
    res.status(200).json({
      message: `Products all data`,
      data: responseAllData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const ProductViewControllers = async (req, res) => {
  try {
    const productid = req.params.productid;

    if (!productid) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const responseData = await Product.findById(productid).populate("category");

    if (!responseData) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: `${responseData.productName} product details`,
      data: responseData,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const ProductViewByUpdateIDControllers = async (req, res) => {
  try {
    const { productName, description, price, offerPrice, category, inStack } =
      req.body;

    const _id = req.params._id;

    const validFields = [
      "productName",
      "description",
      "price",
      "offerPrice",
      "inStack",
      "ProductImages",
      "category",
    ];

    const validProduct = await Product.findById(_id);
    if (!validProduct) {
      return res.status(400).json({ message: `invalid Product _id` });
    }

    let updateImages = validProduct.ProductImages;
    if (req.files && req.files.length > 0) {
      updateImages = req.files.map((item) => ({
        image_link: item.location,
      }));
    }

    const invalidFields = Object.keys(req.body).filter(
      (field) => !validFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid field(s): ${invalidFields.join(", ")}` });
    }

    const validCategory = await productCategory.findById(category);
    if (!validCategory) {
      return res.status(400).json({ message: "Category not found" });
    }
    if (Number(price) <= Number(offerPrice)) {
      return res
        .status(400)
        .json({ message: "Offer price less than Product Price" });
    }
    let inStackValue = inStack;
    if (typeof inStack === "string") {
      if (inStack.toLowerCase() === "true") {
        inStackValue = true;
      } else if (inStack.toLowerCase() === "false") {
        inStackValue = false;
      } else {
        return res
          .status(400)
          .json({ message: "inStack must be true or false" });
      }
    }

    if (typeof inStackValue !== "boolean") {
      return res.status(400).json({ message: "inStack must be true or false" });
    }

    const data = {
      productName,
      description,
      price,
      offerPrice,
      category,
      inStack: inStackValue,
      ProductImages: updateImages,
    };

    const updateData = await Product.findByIdAndUpdate({ _id }, data, {
      new: true,
    });

    const response = await updateData.save();

    res.status(200).json({
      message: `${productName} product is updated sucessfully`,
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const ProductDeleteControllers = async (req, res) => {
  try {
    const { _id } = req.body;
    const productData = await Product.findByIdAndDelete(_id);
    if(!productData){
        res.status(400).json({ message: "product not found" });
    }
    res
      .status(200)
      .json({
        message: `${productData.productName} product Deleted sucessfully`,
      });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = {
  ProductAddControllers,
  ProductsAllControllers,
  ProductViewControllers,
  ProductViewByUpdateIDControllers,
  ProductDeleteControllers,
};
