import express, { Request, Response } from 'express';
import { currentUser } from '@dkprojects/common';

/**
 * As we have set our cookies in a way that cannot be referenced by the browser in
 * the frontend, this route will verify the JWT inside the cookie and return 
 * if the user is logged in or not
 */
const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
    /**
     * ts marks an error on !req.session.jwt because it thinks that req.session 
     * can be undefined, which cannot because the cookie-session middleware is
     * above the route handler in the index.ts.
     * To fix this, we first check if req.session is not null or undefined:
     * !req.session || !req.session.jwt
     * OR
     * !req.session?.jwt
     * 
     * 
     * We dont need this check anymore as we are using our currentUser middleware
     */
    // if (!req.session?.jwt) {
    //     return res.send({currenUser: null });
    // }

    /**
     * the currentUser property on req.currentUser is being defined
     * and attached to the request object in the currentUser middleware 
     */
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };