const {
  brandAddController,
  brandUpdateController,
} = require("../controller/brand/brandController");
const { jwtVerify } = require("../middleware/jwtMiddleware");

const brandRoutes = require("express").Router();

brandRoutes.post("/", jwtVerify, brandAddController);
brandRoutes.patch("/:brandId", jwtVerify, brandUpdateController);

module.exports = brandRoutes;
