import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handling';
import { NotFoundError } from './errors/not-found-error';

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
     */
    secure: true
}));

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

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

const start = async () => {
    /**
     * To connect to out DB pod in k8s, we use the created mongo service name in the connection string along with the port
     * /auth is the name of the database, and if doesnt exists, mongo will create it automatically
     */
    try {        
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('success on connecting to DB');
    } catch(err) {
        console.log(err);
    }
}

start();

app.listen(3000, () => {
    console.log('app listening on port 3000 with DB');
});