const express = require("express");
const { CategoryController } = require("../controllers/CategoryControllers");
const upload = require("../middleware/multer");

const router = express.Router();

router.post(
  "/product/category/add",
  upload.single("category_image"),  
  CategoryController
);

module.exports = router;