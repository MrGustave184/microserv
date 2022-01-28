import { Request, Response, NextFunction, request } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// Augmenting the Request type definition (interface)
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    // If user is not logged in, just go to the next middleware
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;

        /**
         * As we are trying to assign the currentUser property to the request object,
         * ts will mark an error. We have to augment the type definition of the
         * express Request class, telling ts that we have an optional property in there
         * called currentUser, and it is of type UserPayload 
         */
        req.currentUser = payload;
    } catch (err) {}

    next();
};