/**
 * This is the startup file for the jest tests
 * In the package.json:
 *  --watchAll = run tests after every ts file change
 *  --no-cache = help jest get along with ts
 *  "preset": "ts-jest" = help jest get along with ts
 */

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

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
    await mongo.stop();
    await mongoose.connection.close();
})