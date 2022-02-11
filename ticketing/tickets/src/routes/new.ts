import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@dkprojects/common';
import { Ticket } from '../models/ticket';
 
const router = express.Router();

router.post('/api/tickets', requireAuth, [
    /**
     * Validate request only after require auth is successful as we dont
     * need to validate the body of any unauthorized request
     * 
     * Remember this doesnt cause any errors to be thrown, this middleware
     * just sets the errors for the request
     */
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
        .not().isEmpty()
        // Is float and greater than zero
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
    const { title, price } = req.body;

    /**
     * we add the ! in req.currentUser!.id because typescript ask us to check
     * if currentUser is defined but as per our requireAuth middleware, we know that it is defined
     * otherwise we would never reach this block of code because we
     * would return early with an error
     */
    const ticket = Ticket.build({
        title, 
        price,
        userId: req.currentUser!.id
    });

    await ticket.save();

    res.status(201).send(ticket);
});

export { router as createTicketRouter }