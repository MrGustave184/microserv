import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/tickets for post request', async () => {
const response = await request(app)
    .post('/api/tickets')
    .send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accesed by logged in users', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
});

it('returns a status other than 401 if the user is signed in ', async () => {
    
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if invalid title is provided', async () => {
    // Empty title
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: '',
        price: 123
    })
    // Expect 400 from out validateRequest middleware
    .expect(400)

    // No title
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        price: 123
    })
    // Expect 400 from out validateRequest middleware
    .expect(400)
});

it('returns an error if invalid price is provided', async () => {
    // Negative price
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'new ticket',
        price: -10
    })
    // Expect 400 from out validateRequest middleware
    .expect(400)

    // No price
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'new title'
    })
    // Expect 400 from out validateRequest middleware
    .expect(400)
});


it('creates a ticket', async () => {
    // check if indeed there is no ticket saved
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'new ticket';
    
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 20
        })
        .expect(201);

    // check if a ticket was successfully created
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
});