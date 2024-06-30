const { validationResult, check } = require("express-validator");

exports.CategoryValidator = [
  check("name").notEmpty().withMessage("Name is required"),

  // Validation result handling middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
