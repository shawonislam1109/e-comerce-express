const { check, validationResult, body } = require("express-validator");

// Custom validator function for unit
const validateUnit = (value) => {
  // Define your custom validation logic for unit here
  switch (value) {
    case "carton":
      return ["carton", "box", "pies", "pageUnit"];
    case "box":
      return ["box", "pies", "pageUnit"];
    case "pies":
      return ["pies", "pageUnit"];
    case "pageUnit":
      return ["pageUnit"];
    default:
      return [];
  }
};

// ERROR FORMATTER
const errorFormatter = (errors, field) => {
  return errors.map((error) => ({
    field: `${field}.${error}`,
    message: `${error} is a required field`,
  }));
};

// errors
let productsDetailsErrors = [];

const productValidator = [
  check("productType")
    .notEmpty()
    .withMessage("Product type is required")
    .isIn(["medicine", "clothes", "electronics", "supper_shop"])
    .withMessage("Product Type value must be valid")
    .trim()
    .toLowerCase(),

  check("productName").notEmpty().withMessage("Product Name is required"),

  check("category").notEmpty().withMessage("Category is required"),

  check("unit")
    .notEmpty()
    .withMessage("Unit is required")
    .isIn([
      "carton",
      "box",
      "page",
      "pies",
      "ton",
      "pageUnit",
      "gram",
      "kg",
      "hali",
      "dazan",
    ])
    .withMessage("Unit must be a valid value"),

  check("wholeSalePrice")
    .notEmpty()
    .withMessage("Wholesale Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Wholesale Price must be a positive number"),
  check("totalPrice")
    .notEmpty()
    .withMessage("TotalPrice Price is required")
    .isFloat({ gt: 0 })
    .withMessage("TotalPrice Price must be a positive number"),

  check("expDate")
    .notEmpty()
    .withMessage("Expiration Date is required")
    .isISO8601()
    .withMessage("Expiration Date must be a valid date"),

  // Conditional validation for productDetails based on the unit

  // Custom validation for unit specific fields
  body("eachProductQuantity").custom((value, { req, res }) => {
    const requiredFields = validateUnit(req?.body?.unit);
    const missingFields = requiredFields.filter((field) => !value[field]);

    if (missingFields.length > 0) {
      const errors = errorFormatter(missingFields, "eachProductQuantity");
      productsDetailsErrors = productsDetailsErrors.concat(errors);
      throw new Error("Each Product Quantity errors");
    }

    // Return true to indicate validation passed
    return true;
  }),
  // Custom validation for unit specific fields
  body("productQuantity").custom((value, { req, res }) => {
    const requiredFields = validateUnit(req?.body?.unit);
    const missingFields = requiredFields.filter((field) => !value[field]);

    if (missingFields.length > 0) {
      const errors = errorFormatter(missingFields, "productQuantity");
      productsDetailsErrors = productsDetailsErrors.concat(errors);
      throw new Error("product quantity errors");
    }

    // Return true to indicate validation passed
    return true;
  }),

  // Conditional validation for productPrice based on the unit
  body("purchasePrice").custom((value, { req }) => {
    const requiredFields = validateUnit(req?.body?.unit);

    const missingFields = requiredFields.filter((field) => !value[field]);

    if (missingFields.length > 0) {
      const errors = errorFormatter(missingFields, "purchasePrice");
      productsDetailsErrors = productsDetailsErrors.concat(errors);
      throw new Error("purchasePrice errors");
    }

    // Return true to indicate validation passed
    return true;
  }),
  // Conditional validation for productPrice based on the unit
  body("salePrice").custom((value, { req }) => {
    const requiredFields = validateUnit(req?.body?.unit);

    const missingFields = requiredFields.filter((field) => !value[field]);

    if (missingFields.length > 0) {
      const errors = errorFormatter(missingFields, "salePrice");
      productsDetailsErrors = productsDetailsErrors.concat(errors);
      throw new Error("purchasePrice errors");
    }

    // Return true to indicate validation passed
    return true;
  }),

  // Additional validation rules can be added here for other fields if needed

  // Custom validation error handler
  (req, res, next) => {
    const errors = validationResult(req);
    // if (productsDetailsErrors?.length > 0) {
    //   return res.status(422).json({
    //     errors: productsDetailsErrors,
    //     message: "Product details is not provide",
    //   });
    // } else {
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array(), data: productsDetailsErrors });
    }
    // }
    next();
  },
];

module.exports = { productValidator };
