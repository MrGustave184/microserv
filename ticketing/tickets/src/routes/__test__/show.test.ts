import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the ticket is not found', async () => {
    /**
     * Id must have a specific format so we must fake one
     */
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .get(`/api/tickets/${id}`)
        .send()

        /**
         * Expectations throw an error if not satisfied
         */
        .expect(404)
});

it('returns the ticket if it is found', async () => {
    const ticket = {
        title: 'new ticket',
        price: 20
    }

    /**
     * The other aproach is to use the Ticket model to create and save
     * a ticket and then test the route handler.
     * 
     * In this current approach, we instead use the api route to create the
     * ticket 
     */
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send(ticket)
        .expect(201)

    const ticketId = response.body.id;

    const ticketResponse = await request(app)
        .get(`/api/tickets/${ticketId}`)
        .send()
        .expect(200)

    expect(ticketResponse.body.title).toEqual(ticket.title);
    expect(ticketResponse.body.price).toEqual(ticket.price);
});