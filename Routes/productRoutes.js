const {
  productAddController,
} = require("../controller/product/productController");
const { jwtVerify } = require("../middleware/jwtMiddleware");

const productRoutes = require("express").Router();

productRoutes.post("/", jwtVerify, productAddController);

module.exports = productRoutes;
