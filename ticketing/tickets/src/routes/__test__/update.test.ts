import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if provided Id doesnt exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const ticket = {
        title: 'new ticket',
        price: 20
    }

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send(ticket)
        .expect(404)
});

it('returns a 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const ticket = {
        title: 'new ticket',
        price: 20
    }

    await request(app)
        .put(`/api/tickets/${id}`)
        .send(ticket)
        .expect(401)
});

it('returns a 401 if user doesnt own the ticket', async () => {

});

it('returns a 400 if user provides invalid title or price', async () => {

});

it('updates the ticket if the user provides valid information', async () => {

});