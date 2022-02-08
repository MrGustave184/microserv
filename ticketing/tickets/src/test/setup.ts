/**
 * This is the startup file for the jest tests
 * In the package.json:
 *  --watchAll = run tests after every ts file change
 *  --no-cache = help jest get along with ts
 *  "preset": "ts-jest" = help jest get along with ts
 */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from "supertest";
import { app } from '../app';

/**
 * register the signin property in the global nodejs namespace
 */
// declare global {
//     namespace NodeJS {
//         export interface Global {
//             /**
//              * For promises, the angle brackets indicates wich type they 
//              * will resolve to
//              */
//             signin(): Promise<string[]>;
//         }
//     }
// }

/**
 * register the signin property in the global nodejs namespace
 */
declare global {
    var signin: () => Promise<string[]>;
}

/**
 * This doesnt need to be a global function, it is just for convenience so we dont
 * need to import it in every file
 * 
 * You can export this function on its own file and then import it
 * wherever you need it 
 */
global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({ email, password })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
}

let mongo: any;

/**
 * Define a hook function. This will run whatever we pass to it before we
 * run all our tests
 */
beforeAll(async () => {
    /**
     * As we define our env variables as secretsusing our k8s deployment file,
     * we have redefine the variables in any way so our tests doesnt fail
     */
    process.env.JWT_KEY = 'test_key';

    // Remember js access all variables by reference
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
});

/**
 * Hook function to run before each of out tests
 */
beforeEach(async () => {
    // Delete data in each collection
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

/**
 * Hook function to run after all of out tests
 */
afterAll(async () => {
    /**
     * I think mongo operations are slow because I am using WSL
     */
    jest.setTimeout(10000);

    await mongo.stop();
    await mongoose.connection.close();
})