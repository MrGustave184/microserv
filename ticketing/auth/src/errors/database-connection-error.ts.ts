// Import ValidationError type
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to database';
    statusCode = 500;

    constructor() {
        // This message is passed to the Error class constructor
        // It is used just for log purposes
        super('Error connecting to DB - express Error classs');

        // Only because we are extending an express built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { 
                message: this.reason 
            }
        ]
    }
}