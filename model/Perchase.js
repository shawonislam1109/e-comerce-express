const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const purchaseModel = new Schema({
  supplier: {
    type: ObjectId,
    ref: "supplier",
    required: [true, "supplier is required field"],
  },
  products: {
    type: [ObjectId],
  },
  grandTotal: {
    type: Number,
    required: [true, "grandTotal is required"],
  },
  tax: {
    type: Number,
    required: [true, "grandTotal is required"],
  },
  discount: {
    type: Number,
  },
});

const Purchase = model("Purchase", purchaseModel);
module.exports = Purchase;
