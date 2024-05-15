const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const userModel = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    companyName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: "merchant",
    },
    branch: {
      type: ObjectId,
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("users", userModel);
module.exports = UserModel;
