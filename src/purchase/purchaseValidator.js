const { check, validationResult, body } = require("express-validator");
const enums = require("../enum/enums");

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

const purchaseValidator = [
  check("productsId")
    .isArray({ min: 1 })
    .withMessage("productsId is required")
    .withMessage("ProductsId must be an array of strings"),

  check("wholeSalePrice").notEmpty().withMessage("Wholesale Price is required"),
  check("memoNo").notEmpty().withMessage("MemoNo  is required"),
  check("supplier")
    .notEmpty()
    .withMessage("supplier  is required")
    .isMongoId()
    .withMessage("supplier  is will be MongoId"),

  // payment method
  check("paymentMethod")
    .notEmpty()
    .withMessage("paymentMethod  is required")
    .isIn(enums.paymentMethod)
    .withMessage("paymentMethod  is required"),
  check("paymentStatus")
    .notEmpty()
    .withMessage("paymentStatus  is required")
    .isIn(enums.paymentStatus)
    .withMessage("paymentStatus  is required"),

  // PRODUCT VALIDATION
  check("products")
    .isArray({ min: 1 })
    .withMessage("products is required")
    .custom((products, { req }) => {
      let productsDetailsErrors = [];

      products.forEach((product, index) => {
        const requiredFields = validateUnit(product.unit);
        const eachProductQuantityErrors = requiredFields.filter(
          (field) =>
            !product.eachProductQuantity || !product.eachProductQuantity[field]
        );
        const productQuantityErrors = requiredFields.filter(
          (field) => !product.productQuantity || !product.productQuantity[field]
        );
        const purchasePriceErrors = requiredFields.filter(
          (field) => !product.purchasePrice || !product.purchasePrice[field]
        );
        const salePriceErrors = requiredFields.filter(
          (field) => !product.salePrice || !product.salePrice[field]
        );

        if (eachProductQuantityErrors.length > 0) {
          productsDetailsErrors = productsDetailsErrors.concat(
            errorFormatter(
              eachProductQuantityErrors,
              `product.${index}.eachProductQuantity`
            )
          );
        }
        if (productQuantityErrors.length > 0) {
          productsDetailsErrors = productsDetailsErrors.concat(
            errorFormatter(
              productQuantityErrors,
              `product.${index}.productQuantity`
            )
          );
        }
        if (purchasePriceErrors.length > 0) {
          productsDetailsErrors = productsDetailsErrors.concat(
            errorFormatter(
              purchasePriceErrors,
              `product.${index}.purchasePrice`
            )
          );
        }
        if (salePriceErrors.length > 0) {
          productsDetailsErrors = productsDetailsErrors.concat([
            {
              type: `product.${index}.salePrice`,
              message: "Sale price is required",
            },
          ]);
        }
      });

      if (productsDetailsErrors.length > 0) {
        throw new Error(JSON.stringify(productsDetailsErrors));
      }

      return true;
    }),

  // Custom validation error handler
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array(), data: productsDetailsErrors });
    }
    next();
  },
];

module.exports = { purchaseValidator };
