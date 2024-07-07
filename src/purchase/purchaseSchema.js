const mongoose = require("mongoose");

const Supplier = require("../../model/supplier");
const Product = require("../product/product-schema-category/medicine/product");
const eachProductQuantity = require("../product/product-schema-category/medicine/eachProductQuantity");
const productQuantitySchema = require("../product/product-schema-category/medicine/productQuantity");
const purchasePriceSchema = require("../product/product-schema-category/medicine/purchasePrice");
const salePriceSchema = require("../product/product-schema-category/medicine/salePrice");
const enums = require("../enum/enums");
const PurchaseProductsDetails = require("./purchaseProductsDetailsSchema");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

// product schema design
const purchaseSchema = new Schema(
  {
    wholeSalePrice: {
      type: Number,
      required: true,
    },
    productsId: [{ type: ObjectId }],
    productDetails: [{ type: ObjectId }],
    grandTotalPrice: {
      type: Number,
    },
    totalDiscount: {
      type: Number,
    },
    warranty: {
      type: String,
    },
    gantry: {
      type: String,
    },
    expDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      enum: {
        values: enums.paymentMethod,
        message: "Product Type value must be valid",
      },
    },
    paymentStatus: {
      type: String,
      enum: {
        values: enums.paymentStatus,
        message: "Payment Status must be valid",
      },
    },
    memoNo: {
      type: String,
      required: true,
    },
    supplier: {
      type: ObjectId,
      required: true,
      ref: Supplier,
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    roleBy: {
      type: ObjectId,
    },
    branch: {
      type: ObjectId,
    },
    remarks: {
      type: String,
    },
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
const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
