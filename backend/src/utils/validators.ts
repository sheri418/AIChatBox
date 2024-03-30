import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';

// Middleware function to handle validation
export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
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


// Array of validation chains for login route
export const loginValidator: ValidationChain[] = [
   
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];
// Array of validation chains for signup route
export const signupValidator: ValidationChain[] = [
    body("name").notEmpty().withMessage("Name is required"), 
   ...loginValidator,
];
