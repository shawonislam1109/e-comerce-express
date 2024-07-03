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
  (req, res, next) => {
    if (!Array.isArray(req.body.products)) {
      return res
        .status(422)
        .json({ errors: [{ msg: "Products must be an array" }] });
    }

    req.body.products.forEach((product, index) => {
      check(`products[${index}].wholeSalePrice`)
        .notEmpty()
        .withMessage("Wholesale Price is required")
        .isFloat({ gt: 0 })
        .withMessage("Wholesale Price must be a positive number")(
        req,
        res,
        () => {}
      );

      check(`products[${index}].discount`)
        .notEmpty()
        .withMessage("Discount Price is required")
        .isFloat({ gt: 0 })
        .withMessage("Discount Price must be a positive number")(
        req,
        res,
        () => {}
      );

      check(`products[${index}].totalPrice`)
        .notEmpty()
        .withMessage("TotalPrice Price is required")
        .isFloat({ gt: 0 })
        .withMessage("TotalPrice Price must be a positive number")(
        req,
        res,
        () => {}
      );

      check(`products[${index}].expDate`)
        .notEmpty()
        .withMessage("Expiration Date is required")
        .isISO8601()
        .withMessage("Expiration Date must be a valid date")(
        req,
        res,
        () => {}
      );

      body(`products[${index}].eachProductQuantity`).custom(
        (value, { req }) => {
          const requiredFields = validateUnit(product.unit);
          const missingFields = requiredFields.filter((field) => !value[field]);

          if (missingFields.length > 0) {
            const errors = errorFormatter(
              missingFields,
              `products[${index}].eachProductQuantity`
            );
            productsDetailsErrors = productsDetailsErrors.concat(errors);
            throw new Error("Each Product Quantity errors");
          }

          return true;
        }
      );

      body(`products[${index}].productQuantity`).custom((value, { req }) => {
        const requiredFields = validateUnit(product.unit);
        const missingFields = requiredFields.filter((field) => !value[field]);

        if (missingFields.length > 0) {
          const errors = errorFormatter(
            missingFields,
            `products[${index}].productQuantity`
          );
          productsDetailsErrors = productsDetailsErrors.concat(errors);
          throw new Error("Product Quantity errors");
        }

        return true;
      });

      body(`products[${index}].purchasePrice`).custom((value, { req }) => {
        const requiredFields = validateUnit(product.unit);
        const missingFields = requiredFields.filter((field) => !value[field]);

        if (missingFields.length > 0) {
          const errors = errorFormatter(
            missingFields,
            `products[${index}].purchasePrice`
          );
          productsDetailsErrors = productsDetailsErrors.concat(errors);
          throw new Error("Purchase Price errors");
        }

        return true;
      });

      body(`products[${index}].salePrice`).custom((value, { req }) => {
        const requiredFields = validateUnit(product.unit);
        const missingFields = requiredFields.filter((field) => !value[field]);

        if (missingFields.length > 0) {
          const errors = errorFormatter(
            missingFields,
            `products[${index}].salePrice`
          );
          productsDetailsErrors = productsDetailsErrors.concat(errors);
          throw new Error("Sale Price errors");
        }

        return true;
      });
    });

    next();
  },
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty() || productsDetailsErrors.length > 0) {
      return res.status(422).json({
        errors: errors.array().concat(productsDetailsErrors),
      });
    }
    next();
  },
];
