const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  allGetPurchaseProduct,
  createPurchase,
  updatePurchaseProduct,
  allGetSinglePurchaseProduct,
  getFile,
  allGetPurchaseProductInvoice,
} = require("./controller");
const { purchaseValidator } = require("./purchaseValidator");

const purchaseRoutes = require("express").Router();

purchaseRoutes.get("", jwtVerify, allGetPurchaseProduct);
purchaseRoutes.get("/file", getFile);
purchaseRoutes.post("", jwtVerify, purchaseValidator, createPurchase);
purchaseRoutes.patch("/:purchaseId", jwtVerify, updatePurchaseProduct);
purchaseRoutes.get(
  "/purchase/:purchaseId",
  jwtVerify,
  allGetSinglePurchaseProduct
);
purchaseRoutes.get(
  "/invoice/:purchaseId",
  jwtVerify,
  allGetPurchaseProductInvoice
);

module.exports = purchaseRoutes;
