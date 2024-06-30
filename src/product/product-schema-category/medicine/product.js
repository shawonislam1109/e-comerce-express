const mongoose = require("mongoose");
const productQuantitySchema = require("./productQuantity");
const purchasePriceSchema = require("./purchasePrice");
const salePriceSchema = require("./salePrice");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

// product schema design
const productSchema = new Schema(
  {
    productType: {
      type: String,
      required: [true, "Please provide product type"],
      trim: true,
      lowercase: true,
      enum: {
        values: ["medicine", "clothes", "electronics", "supper_shop"],
        message: "Product Type value must be valid",
      },
    },
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: [
          "carton",
          "box",
          "page",
          "pies",
          "pageUnit",
          "ton",
          "gram",
          "kg",
          "hali",
          "dazan",
        ],
        message: "Provide a valid value",
      },
    },

    productQuantity: productQuantitySchema,
    purchasePrice: purchasePriceSchema,
    salePrice: salePriceSchema,

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
    totalPrice: {
      type: Number,
      required: [true, "Total Price is a required field"],
    },
    supplier: {
      type: ObjectId,
      ref: "Supplier",
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
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
