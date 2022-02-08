import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest, BadRequestError } from "@dkprojects/common";  
import jwt from 'jsonwebtoken';


const router = express.Router();

// Second parameter are the route specific middlewares
router.post('/api/users/signup', [
        body('email')
            .isEmail() // check is email parameter is valid email
            .withMessage('Email must be valid'), // attach error if email check fails
        body('password')
            .trim() // remove start/end whitespaces
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be beetwen 4 and 20 characters')
    ],
    validateRequest,
    // we import the types Request and Response at the top
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            throw new BadRequestError('Email already in use');
        }

        const user = User.build({ email, password });

        await user.save();

        /**
         * As we are not providing a callback to the sign method, it will behave 
         * synchronously
         * 
         * process.env.JWT_KEY!
         * As typescript never assumes a env variable is defined, it will mark an error
         * if we dont check for it with an if statement, but as we already did that in
         * the index so we can catch the error when starting the service, the 
         * exclamation at the end of the variable tells typescript to not worry 
         * cheking it as we already did somewhere else 
         */
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        /**
         * As the type definition file for cookie-session doesnt recognize we have 
         * the req.session object, we cannot do req.session.jw
         * So we set the object ourselves
         * 
         * The cookie-session library will take this token, serialize it and send it
         * to the user's browser. For this cookie to be reflected in postman, we have to
         * specify the https:// in the url.
         * 
         * The string contained in the cookie is a base64 encoded object that contains our JWT
         */
        req.session = { jwt: userJwt };

        res.status(201).send(user);
    }
);

export { router as signupRouter };