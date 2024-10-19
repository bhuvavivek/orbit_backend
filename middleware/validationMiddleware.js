const { check, validationResult } = require("express-validator");

// Validation for uploading reports
exports.validateUpload = [
  check("platform").notEmpty().withMessage("Platform name is required"),
  check("month").notEmpty().withMessage("Month is required"),
  check("year").isNumeric().withMessage("Year must be a number"),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
