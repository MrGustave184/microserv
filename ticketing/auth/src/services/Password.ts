/**
 * scrypt is out hashing function, but as it is callback based, then we use
 * promisify to turn it into a promise based function so we
 * can use async/await
 */
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// Turn scrypt function from callback implementation to promise implementation
const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');

        // We tell typescript that buffer is of type Buffer
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}}`;
    }
    static compare(storedPassword: string, suppliedPassword: string) {}
}