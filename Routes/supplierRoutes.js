const {
  supplierController,
} = require("../controller/supplier/supplierController");
const { jwtVerify } = require("../middleware/jwtMiddleware");

const supplierRoute = require("express").Router();

supplierRoute.post("", jwtVerify, supplierController);

module.exports = supplierRoute;
