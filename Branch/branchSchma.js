const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const branchSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Branch is required"],
      //   maxLength: [, "maximum length is 15"],
    },
    location: {
      type: String,
      //   required: [true, "location is required"],
    },
    merchant: {
      type: ObjectId,
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
