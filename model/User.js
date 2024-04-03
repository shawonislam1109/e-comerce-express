const { model, Schema } = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

const UserModel = model("users", userModel);
module.exports = UserModel;
