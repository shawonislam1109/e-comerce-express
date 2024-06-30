const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

// product schema design
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
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
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
