import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
    const ticket = {
        title: 'new ticket',
        price: 20
    } 

    // Return the promise
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send(ticket);
}

it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200)

    expect(response.body.length).toEqual(3);
})