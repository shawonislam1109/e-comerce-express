const mongoose = require("mongoose");

const Supplier = require("../../model/supplier");
const Product = require("../product/product-schema-category/medicine/product");
const eachProductQuantity = require("../product/product-schema-category/medicine/eachProductQuantity");
const productQuantitySchema = require("../product/product-schema-category/medicine/productQuantity");
const purchasePriceSchema = require("../product/product-schema-category/medicine/purchasePrice");
const salePriceSchema = require("../product/product-schema-category/medicine/salePrice");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

// product schema design
const purchaseSchema = new Schema(
  {
    eachProductQuantity: eachProductQuantity,
    productQuantity: productQuantitySchema,
    purchasePrice: purchasePriceSchema,
    salePrice: salePriceSchema,

    productId: [{ type: ObjectId, ref: Product }],
    wholeSalePrice: {
      type: Number,
      required: true,
    },
    warranty: {
      type: String,
    },
    gantry: {
      type: String,
    },
    expDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      required: [true, "Total Price is a required field"],
    },
    supplier: {
      type: ObjectId,
      required: true,
      ref: Supplier,
    },
    product: {
      type: ObjectId,
      required: true,
      ref: Product,
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
