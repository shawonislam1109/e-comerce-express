const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

// Define the schema for the stock model
const stockSchema = new Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "product",
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a stock name"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    imageUrls: {
      type: String,
      //   required: true,
      validate: {
        validator: (value) => {
          if (!Array.isArray(value)) {
            return false;
          }
          let isValid = true;
          value.forEach((url) => {
            if (validator.isURL(url)) {
              isValid = false;
            }
          });
          return isValid;
        },
        message: "Please provide a valid image url",
      },
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {value}.must be kg/litre/pcs/bag",
      },
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cant be 0"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity cant be 0"],
    },
    category: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: ObjectId,
      },
    ],
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "brand",
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status cant be out of {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name"],
        unique: true,
        lowercase: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name"],
        unique: true,
        lowercase: true,
      },
      id: {
        type: ObjectId,
        ref: "supplier",
      },
    },
  },

  {
    timestamps: true,
  }
);
// Create the Stock model using the schema
const Stock = model("Stock", stockSchema);

module.exports = Stock;
