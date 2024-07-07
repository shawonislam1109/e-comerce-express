const mongoose = require("mongoose");
const productQuantitySchema = require("../product/product-schema-category/medicine/productQuantity");
const purchasePriceSchema = require("../product/product-schema-category/medicine/purchasePrice");
const salePriceSchema = require("../product/product-schema-category/medicine/salePrice");
const Purchase = require("./purchaseSchema");
const Product = require("../product/product-schema-category/medicine/product");
const eachProductQuantity = require("../product/product-schema-category/medicine/eachProductQuantity");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

// product schema design
const PurchaseProductsDetailsSchema = new Schema(
  {
    eachProductQuantity: eachProductQuantity,
    productQuantity: productQuantitySchema,
    purchasePrice: purchasePriceSchema,
    salePrice: salePriceSchema,
    tax: {
      amount: { type: Number },
      percentage: { type: Number },
    },
    discount: {
      amount: { type: Number },
      percentage: { type: Number },
    },
    expDate: {
      type: Date,
    },
    warranty: {
      type: String,
    },
    gantry: {
      type: String,
    },
    product: { type: ObjectId, ref: Product },
    isTrash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// schema model
const PurchaseProductsDetails = mongoose.model(
  "PurchaseProductsDetails",
  PurchaseProductsDetailsSchema
);

module.exports = PurchaseProductsDetails;
