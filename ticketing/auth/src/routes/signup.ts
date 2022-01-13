import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/User';
import { BadRequestError } from '../errors/bad-request-error';  
import { NotFoundError } from '../errors/not-found-error';


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

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            throw new BadRequestError('Email already in use');
        }

        const user = User.build({ email, password });

        await user.save();

        res.status(201).send(user);
    }
);

export { router as signupRouter };