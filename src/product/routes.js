const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  productAddController,
  getProducts,
  productById,
  productUpdate,
} = require("./controller");
const {
  productValidator,
} = require("./product-schema-category/medicine/validator");

const productRoutes = require("express").Router();

productRoutes.post("/", jwtVerify, productValidator, productAddController);
productRoutes.get("/", jwtVerify, getProducts);
productRoutes.get("/:productId", jwtVerify, productById);
productRoutes.patch("/:productId", jwtVerify, productUpdate);

module.exports = productRoutes;
