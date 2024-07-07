const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  allGetPurchaseProduct,
  createPurchase,
  updatePurchaseProduct,
} = require("./controller");
const { purchaseValidator } = require("./purchaseValidator");

const purchaseRoutes = require("express").Router();

purchaseRoutes.get("", jwtVerify, allGetPurchaseProduct);
purchaseRoutes.post("", jwtVerify, purchaseValidator, createPurchase);
purchaseRoutes.patch("/:purchaseId", jwtVerify, updatePurchaseProduct);

module.exports = purchaseRoutes;
