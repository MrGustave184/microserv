/**
 * The purpose of this file is to configure the app but not start it. That is the job 
 * of any other file that requires and thus imports app from ./app
 * 
 * One of these files is the file needed to run the supertest library.
 * 
 * npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server
 * 
 * with mongodb-memory-server we can use a in memory test mongo db for each service
 * when testing services together 
 */

import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from "@dkprojects/common";

const app = express();
/**
 * As traffic to our app is being proxied (ingress nginx), we must set express to accept the https connection
 * through the proxy
 */
app.set('trust proxy', true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({
    /**
     * We will no encrypt the cookie as it is a JWT so its already protected and this way, we
     * solve the problem of the cookie working for different languages
     */
    signed: false,

    /**
     * Require https connection
     * 
     * supertest library doenst send https requests by default, so this
     * will set to false if we are in a test environment
     * 
     * NODE_ENV is set to test automatically by supertest/jest
     */
    secure: process.env.NODE_ENV !== 'test'
}));

// Pass request to not existing route to the error handler
// It goes at the end because routing is always parsed from top to bottom

/** synchronous Route - error handling */
// app.all('*', () => {
//     throw new NotFoundError();
// });

/** asynchronous Route - error handling */
app.all('*', async (req, res, next) => {
    // Instead of throwing the error, we can pass it to express
    // next(new NotFoundError());

    // Or we can use the express-async-errors package and keep throwing the errors as normal
    throw new NotFoundError();
});

// Middlewares
app.use(errorHandler);

export { app };