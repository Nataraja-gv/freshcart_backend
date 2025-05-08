const express = require("express");
const {
  CategoryController,
  GetAllCategory,
} = require("../controllers/CategoryControllers");
const upload = require("../middleware/multer");

const router = express.Router();

router.post(
  "/product/category/add",
  upload.single("category_image"),
  CategoryController
);

router.get("/product/category/all", GetAllCategory);
module.exports = router;
