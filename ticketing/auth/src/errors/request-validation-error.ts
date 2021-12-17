// Import ValidationError type
import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        // This message is passed to the Error class constructor
        // It is used just for log purposes
        super('Invalid request parameters');

        // Only because we are extending an express built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        });
    }
}