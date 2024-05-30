const { jwtVerify } = require("../../middleware/jwtMiddleware");
const { productAddController } = require("./controller");

const productRoutes = require("express").Router();

productRoutes.post("/", jwtVerify, productAddController);

module.exports = productRoutes;
