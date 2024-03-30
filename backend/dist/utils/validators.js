"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = exports.loginValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
// Middleware function to handle validation
const validate = (validations) => {
    return async (req, res, next) => {
        // Run each validation chain
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                // If validation fails, return errors immediately
                return res.status(422).json({ errors: result.array() });
            }
        }
        // If all validations pass, proceed to the next middleware
        next();
    };
};
exports.validate = validate;
// Array of validation chains for login route
exports.loginValidator = [
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.body)("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];
// Array of validation chains for signup route
exports.signupValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    ...exports.loginValidator,
];
