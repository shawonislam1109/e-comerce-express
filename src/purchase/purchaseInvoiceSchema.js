const mongoose = require("mongoose");
const productQuantitySchema = require("../product/product-schema-category/medicine/productQuantity");
const purchasePriceSchema = require("../product/product-schema-category/medicine/purchasePrice");
const Purchase = require("./purchaseSchema");
const PurchaseProductsDetails = require("./purchaseProductsDetailsSchema");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

// product schema design
const PurchaseInvoiceSchema = new Schema(
  {
    purchaseProducts: [{ type: ObjectId, ref: PurchaseProductsDetails }],
    purchase: { type: ObjectId, ref: Purchase },
    totalDiscount: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    grandTotal: {
      type: Number,
      required: [true, "Total Price is a required field"],
    },
    tax: {
      type: Number,
    },
    paymentStatus: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    provideBalance: {
      type: Number,
    },
    due: {
      type: Number,
      required: [true],
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
const PurchaseInvoice = mongoose.model(
  "PurchaseInvoice",
  PurchaseInvoiceSchema
);

module.exports = PurchaseInvoice;
