const mongoose = require("mongoose");
const productQuantitySchema = require("../product/product-schema-category/medicine/productQuantity");
const eachProductQuantity = require("../product/product-schema-category/medicine/eachProductQuantity");
const Product = require("../product/product-schema-category/medicine/product");
const purchasePriceSchema = require("../product/product-schema-category/medicine/purchasePrice");
const salePriceSchema = require("../product/product-schema-category/medicine/salePrice");

const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

// product schema design
const stockSchema = new Schema(
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
    eachProductQuantity: eachProductQuantity,
    productQuantity: productQuantitySchema,
    purchasePrice: purchasePriceSchema,
    salePrice: salePriceSchema,
    product: {
      type: ObjectId,
      ref: Product,
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
const Stock = mongoose.model("stock", stockSchema);

module.exports = Stock;
