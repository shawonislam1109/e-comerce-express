const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

// product brand model
const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 100,
      required: [true, "Please provide a valid brand name"],
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid Email"],
      unique: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL"],
    },
    location: {
      type: String,
      required: [true, "Please provide a valid brand name"],
    },
    suppliers: {
      type: [ObjectId],
      ref: "supplier",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
const Brand = mongoose.model("brand", brandSchema);
module.exports = Brand;
