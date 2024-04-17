const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;
// TODO: some model is commented out for development purpose

//product schema design
const invoiceSchema = new Schema({
  name: {
    type: String,
    required: [true, "please provide a name for this product"],
    trim: true,
    lowercase: true,
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
      values: ["kg", "litre", "pcs", "bag", "ton", "gram"],
      message: "unit value can't be {value}.must be kg/litre/pcs/bag",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: String,
    required: [true, "totalPrice is required field"],
  },
  discount: {
    type: Number,
  },
  grandTotal: {
    type: Number,
    required: [true, "grandTotal is required"],
  },
  purchasePrice: {
    type: Number,
  },
  salePrice: {
    type: Number,
  },

  category: [
    {
      name: {
        type: String,
      },
      categoryId: ObjectId,
    },
  ],
  brand: {
    type: [ObjectId],
    ref: "Brand",
  },
});

//schema model
const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
