import { Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/custom-error';

// // Using an interface
// interface CustomError {
//     statusCode: number;
//     serializeErrors(): {
//         message: string;
//         field?: string; // the ? marks this field as optional
//     }[] // This means: this must return an array of objects with this exact structure
// }

// express knows that any middleware with 4 arguments must be an error handler
export const errorHandler = (
    err: Error, 
    req: Request,
    res: Response, 
    next: NextFunction
) => {
    /** With type checks */
    // if(err instanceof RequestValidationError) {
    //     const formatedErrors = err.errors.map(error => {
    //         return { message: error.msg, field: error.param }
    //     });

    //     return res.status(400).send({ errors: formatedErrors })
    // }

    // if(err instanceof DatabaseConnectionError) {
    //     return res.status(500).send({ 
    //         errors: [
    //             {
    //                 message: err.reason
    //             }
    //         ] 
    //     })
    // }

    /** To avoid type checks lets inverse the dependancy */
    if(err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [
            {
                message: 'Something went wrong'
            }
        ]
    });
};