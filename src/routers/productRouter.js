const express = require("express");
const {
  ProductAddControllers,
  ProductsAllControllers,
  ProductViewControllers,
  ProductViewByUpdateIDControllers,
  ProductDeleteControllers,
  ProductChangeStock,
} = require("../controllers/productsControllers");
const upload = require("../middleware/multer");
const sellerAuth = require("../middleware/sellerauth");

const productRouter = express.Router();

productRouter.post(
  "/product/add",
  sellerAuth,
  upload.array("ProductImages", 5),
  ProductAddControllers
);

productRouter.get("/products/view/all", ProductsAllControllers);
productRouter.delete("/products/delete", ProductDeleteControllers);
productRouter.get("/products/view/:productid", ProductViewControllers);
productRouter.patch(
  "/products/update/:_id",
  sellerAuth,
  upload.array("ProductImages", 5),
  ProductViewByUpdateIDControllers
);
productRouter.post("/products/update/stock", sellerAuth, ProductChangeStock);

module.exports = productRouter;
