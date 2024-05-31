const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  createSupplier,
  getSuppliers,
  updateSupplier,
  supplierDelete,
  getSuppliersTrash,
  supplierRestore,
} = require("./controller");
const { validatorAjvSupplier } = require("./validator");

const supplierRoute = require("express").Router();

supplierRoute.post("", jwtVerify, validatorAjvSupplier, createSupplier);
supplierRoute.patch("/:supplierId", jwtVerify, updateSupplier);
supplierRoute.get("", jwtVerify, getSuppliers);
supplierRoute.get("/trash", jwtVerify, getSuppliersTrash);
supplierRoute.patch("/delete/:supplierId", jwtVerify, supplierDelete);
supplierRoute.patch("/restore/:supplierId", jwtVerify, supplierRestore);

module.exports = supplierRoute;
