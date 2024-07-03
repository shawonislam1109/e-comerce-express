const mongoose = require("mongoose");
const productQuantitySchema = require("../product/product-schema-category/medicine/productQuantity");
const purchasePriceSchema = require("../product/product-schema-category/medicine/purchasePrice");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

// product schema design
const PurchaseInvoiceSchema = new Schema(
  {
    productQuantity: productQuantitySchema,
    purchasePrice: purchasePriceSchema,
    productPurchase: { type: ObjectId, ref: Purchase },
    totalDiscount: {
      type: Number,
    },
    grandTotal: {
      type: Number,
      required: [true, "Total Price is a required field"],
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
