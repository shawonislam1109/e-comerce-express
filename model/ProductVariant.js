const { model, Schema } = require("mongoose");

const { ObjectId } = Schema.Types;

const productVariantModel = new Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const productVariant = model("ProductVariant", productVariantModel);
module.exports = productVariant;
