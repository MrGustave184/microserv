import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        /**
         * As super is excecuted before ts checks, we cannot refernce the
         * public property defined in the constructor (public message: string)
         * directly in the super() call doing super(this.message)
         * 
         * But we can reference it afterwards
         */
        super(message);

        /** This does not throw a ts error */
        // this.message

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}