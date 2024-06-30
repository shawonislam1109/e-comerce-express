const mongoose = require("mongoose");
const productQuantitySchema = require("../product/product-schema-category/medicine/productQuantity");

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
    productQuantity: productQuantitySchema,
    productId: {
      type: ObjectId,
      required: true,
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
