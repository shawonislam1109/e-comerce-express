const { model, Schema } = require("mongoose");
const validate = require("validator");
const { ObjectId } = Schema.Types;

const employeeModel = new Schema({
  name: {
    type: String,
    minLength: [4, "min length four"],
    maxLength: [15, "max length 15"],
    required: [true],
  },
  contactNumber: {
    type: String,
    minLength: [4, "min length four"],
    maxLength: [15, "max length 15"],
    required: [true],
    validate: {
      validator: (value) => {
        const regex = /^01[3-9]\d{8}$/;
        return regex.test(value);
      },
      message: "Please provide a valid phone number",
    },
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Provide a valid Email"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  presentAddress: {
    type: String,
    required: [true, "Please provide your present address"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Please provide your permanent address"],
  },
  storeLocation: {
    type: String,
    required: [true, "store location is required"],
  },
});

const Employee = model("employee", employeeModel);

module.exports = Employee;
