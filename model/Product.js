const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;
// TODO: some model is commented out for development purpose

//product schema design
const productSchema = new Schema(
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
        values: ["kg", "litre", "pisces", "bag", "ton", "gram"],
        message: "unit value can't be {value}.must be kg/litre/pcs/bag",
      },
    },
    totalPrice: {
      type: String,
      required: [true, "totalPrice is required field"],
    },
    discount: {
      type: Number,
    },
    supplier: {
      type: ObjectId,
      ref: "supplier",
    },
    category: {
      type: String,
      required: true,
      enum: ["Clothing", "Electronics", "Tools", "Medicine"],
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
  },
  {
    timestamps: true,
  }
);

//schema model
const Product = mongoose.model("product", productSchema);

module.exports = Product;
