import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    /**
     * We assume here that this middleware is always called after the
     * current-user middleware, so the propery currentUser should exists
     * in the request objetct for the user to be logged in 
     */
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }

    next();
}