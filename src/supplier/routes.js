const { jwtVerify } = require("../../middleware/jwtMiddleware");
const { createSupplier, getSuppliers } = require("./controller");

const supplierRoute = require("express").Router();

supplierRoute.post("", jwtVerify, createSupplier);
supplierRoute.get("", jwtVerify, getSuppliers);

module.exports = supplierRoute;
