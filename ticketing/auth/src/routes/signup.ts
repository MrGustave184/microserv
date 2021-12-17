import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error.ts';


const router = express.Router();

// Second parameter is the route specific middlewares
router.post('/api/users/signup', [
        body('email')
            .isEmail() // check is email parameter is valid email
            .withMessage('Email must be valid'), // attach error if email check fails
        body('password')
            .trim() // remove start/end whitespaces
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be beetwen 4 and 20 characters')
    ],

    // we import the types Request and Response at the top
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if(! errors.isEmpty()) {
            // Send array of errors if any and return
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        console.log('Creating user');
        throw new DatabaseConnectionError();
        res.send({});
    }
);

export { router as signupRouter };