const { model, Schema, default: mongoose } = require("mongoose");

const { ObjectId } = Schema.Types;

const productItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name for this product"],
      trim: true,
      lowercase: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name must be at least 3 character"],
      maxLength: [20],
    },

    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {value}.must be kg/litre/pcs/bag",
      },
    },

    product: {
      type: ObjectId,
      ref: "product",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },

    supplier: {
      type: ObjectId,
      ref: "supplier",
    },

    category: [
      {
        name: {
          type: String,
          // required:true,
        },
        _id: ObjectId,
      },
    ],

    brand: {
      type: [ObjectId],
      ref: "Brand",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductItems = mongoose.model("productItems", productItemSchema);

module.exports = ProductItems;
