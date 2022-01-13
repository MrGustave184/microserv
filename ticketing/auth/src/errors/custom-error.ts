export abstract class CustomError extends Error {
    /** By marking as abstract we enforce child classes to implement these */
    abstract statusCode: number;

    constructor(message: string) {
        // pass message to parent class (Error)
        super(message);

        // Only because we are extending an express built in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    // Define method signature
    abstract serializeErrors(): { message: string, field?: string }[]
}