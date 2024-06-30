const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchasePriceSchema = new Schema({
  carton: {
    type: Number,
  },
  box: {
    type: Number,
  },
  page: {
    type: Number,
  },
  pageUnit: {
    type: Number,
  },
  pies: {
    type: Number,
  },
  ton: {
    type: Number,
  },
  kg: {
    type: Number,
  },
  gram: {
    type: Number,
  },
  hali: {
    type: Number,
  },
  meter: {
    type: Number,
  },
});

module.exports = purchasePriceSchema;
