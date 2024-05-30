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
      errorMessage: "Provide a valid Email",
    },
    contactNumber: {
      type: "string",
      pattern: "^01[3-9]\\d{8}$",
      errorMessage: "Please provide a valid phone number",
    },
    emergencyContactNumber: {
      type: "string",
      pattern: "^01[3-9]\\d{8}$",
      errorMessage: "Please provide a valid phone number",
    },
    tradeNumber: {
      type: "string",
      errorMessage: "Please provide your trade licence number",
    },
    presentAddress: {
      type: "string",
      errorMessage: "Please provide your present address",
    },
    permanentAddress: {
      type: "string",
      errorMessage: "Please provide your permanent address",
    },
    location: {
      type: "string",
    },
    imageURL: {
      type: "string",
      format: "uri",
      errorMessage: "Please provide a valid URL",
    },
    nationalIdImageURL: {
      type: "string",
      format: "uri",
      errorMessage: "Please provide a valid URL",
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
    "contactNumber",
    "emergencyContactNumber",
    "tradeNumber",
    "presentAddress",
    "permanentAddress",
    "location",
  ],
  additionalProperties: false,
};

module.exports = supplierJsonSchema;
