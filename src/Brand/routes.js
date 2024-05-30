const { jwtVerify } = require("../../middleware/jwtMiddleware");
const { brandAddController, brandUpdateController } = require("./controller");

const brandRoutes = require("express").Router();

brandRoutes.post("/", jwtVerify, brandAddController);
brandRoutes.patch("/:brandId", jwtVerify, brandUpdateController);

module.exports = brandRoutes;
