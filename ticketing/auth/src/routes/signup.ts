import express, { Request, Response } from 'express';
import { body } from 'express-validator'

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
    (req: Request, res: Response) => {
        const { email, password } = req.body;
        res.send('api v2 signup -');
    }
);

export { router as signupRouter };