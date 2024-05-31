const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Email exits"],
    },
    contactNumber: {
      type: String,
      required: [true, "Please provide a contact number"],
      unique: [true, "Contact number exits"],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, "Please provide a contact number"],
    },
    tradeNumber: {
      type: String,
      unique: [true, "Trade number exits"],
      required: [true, "Please provide your trade licence number"],
    },
    presentAddress: {
      type: String,
      required: [true, "Please provide your present address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please provide your permanent address"],
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
    },
    imageURL: {
      type: String,
    },
    nationalIdImageURL: {
      type: String,
    },
    isTrash: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },
    branch: ObjectId,
    roleBy: ObjectId,
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
