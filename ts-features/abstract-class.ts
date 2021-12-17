/**
 * Cannot be instantiated
 * Used to setup requirements for subclasses
 * Do create a Class when translated to JS, which means you can type check it with instanceof
 */
 export abstract class CustomError extends Error {
    /** By marking as abstract we enforce child classes to implement these */
    abstract statusCode: number;

    constructor() {
        super();

        // Only because we are extending an express built in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    // Define method signature
    abstract serializeErrors(): { message: string, field?: string }[]
}