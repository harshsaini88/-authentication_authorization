// Import necessary functions from the 'express-validator' library
const { body, validationResult } = require('express-validator');

// Validation middleware for user signup
exports.validateSignup = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  // Call the handleValidationResult function to handle validation results
  (req, res, next) => {
    handleValidationResult(req, res, next);
  }
];

// Validation middleware for user login
exports.validateLogin = [
  body('emailOrPhone').notEmpty().withMessage('Email or phone is required'),
  body('password').notEmpty().withMessage('Password is required'),

  // Call the handleValidationResult function to handle validation results
  (req, res, next) => {
    handleValidationResult(req, res, next);
  }
];


// Function to handle validation results and send appropriate response
const handleValidationResult = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return a response with status code 422 and the validation errors
    return res.status(422).json({ errors: errors.array() });
  }
  // Continue to the next middleware or route handler
  next();
};
