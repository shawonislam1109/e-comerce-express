const { createSupplier } = require("../controller/supplier/supplierController");
const { jwtVerify } = require("../middleware/jwtMiddleware");

const supplierRoute = require("express").Router();

supplierRoute.post("", jwtVerify, createSupplier);

module.exports = supplierRoute;
