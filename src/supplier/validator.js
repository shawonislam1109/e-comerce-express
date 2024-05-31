const Ajv = require("ajv");
const ajvErrors = require("ajv-errors");
const addFormats = require("ajv-formats");
const errorMessageHandleWithAjv = require("../../utils/ajvValidatorError");
const ajv = new Ajv({ allErrors: true }); // Initialize AJV with allErrors option
ajvErrors(ajv); // Add custom error messages support
addFormats(ajv);

const supplierJsonSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      maxLength: 100,
      errorMessage: {
        minLength: "Name must be at least 3 characters.",
        maxLength: "Name is too large",
      },
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        type: "Provide a valid Email",
      },
    },
    contactNumber: {
      type: "string",
      pattern: "^01[3-9]\\d{8}$",
      errorMessage: {
        type: "Please provide a valid phone number",
        pattern: "Please provide a valid phone number",
      },
    },
    emergencyContactNumber: {
      type: "string",
      pattern: "^01[3-9]\\d{8}$",
      errorMessage: {
        type: "Please provide a valid phone number",
        pattern: "Please provide a valid phone number",
      },
    },
    tradeNumber: {
      type: "string",
      errorMessage: {
        type: "Please provide your trade licence number",
      },
    },
    presentAddress: {
      type: "string",
      errorMessage: {
        type: "Please provide your present address",
      },
    },
    permanentAddress: {
      type: "string",
      errorMessage: {
        type: "Please provide your permanent address",
      },
    },
    location: {
      type: "string",
    },
    imageURL: {
      type: "string",
      format: "uri",
      errorMessage: {
        format: "Please provide a valid URL",
      },
    },
    nationalIdImageURL: {
      type: "string",
      format: "uri",
      errorMessage: {
        format: "Please provide a valid URL",
      },
    },
    status: {
      type: "string",
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    branch: {
      type: "string",
    },
    roleBy: {
      type: "string",
    },
  },
  required: [
    "name",
    "email",
    "contactNumber",
    "emergencyContactNumber",
    "tradeNumber",
    "presentAddress",
    "permanentAddress",
    "location",
  ],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "Name is required",
      email: "Email is required field",
      contactNumber: "Contact number is required",
      emergencyContactNumber: "Emergency contact number is required",
      tradeNumber: "Trade number is required",
      presentAddress: "Present address is required",
      permanentAddress: "Permanent address is required",
      location: "Location is required",
    },
    // additionalProperties: "No additional properties are allowed",
  },
};

const validateSupplier = ajv.compile(supplierJsonSchema);

const validatorAjvSupplier = (req, res, next) => {
  const valid = validateSupplier(req.body);

  if (!valid) {
    const simplifiedErrors = errorMessageHandleWithAjv(
      validateSupplier?.errors
    );
    return res.status(400).json({
      errors: simplifiedErrors,
    });
  }
  next();
};

module.exports = { validatorAjvSupplier };
