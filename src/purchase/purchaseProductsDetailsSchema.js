const mongoose = require("mongoose");
const productQuantitySchema = require("../product/product-schema-category/medicine/productQuantity");
const purchasePriceSchema = require("../product/product-schema-category/medicine/purchasePrice");
const salePriceSchema = require("../product/product-schema-category/medicine/salePrice");
const Purchase = require("./purchaseSchema");
const Product = require("../product/product-schema-category/medicine/product");
const eachProductQuantity = require("../product/product-schema-category/medicine/eachProductQuantity");
const enums = require("../enum/enums");
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
    unit: {
      type: String,
      enum: {
        values: enums.unit,
        message: "Provide a valid value",
      },
    },
    expDate: {
      type: Date,
    },
    totalPrice: {
      type: Number,
    },
    totalDiscount: {
      type: Number,
    },
    totalTax: {
      type: Number,
    },
    warranty: {
      type: String,
    },
    gantry: {
      type: String,
    },
    purchase: { type: ObjectId },
    product: { type: ObjectId, ref: Product },
    isTrash: {
      type: Boolean,
      default: false,
    },
    roleBy: {
      type: ObjectId,
    },
    branch: {
      type: ObjectId,
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
