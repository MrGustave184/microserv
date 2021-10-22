const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events', event).catch(err => console.log(err));
    axios.post('http://localhost:4001/events', event).catch(err => console.log(err));
    axios.post('http://localhost:4002/events', event).catch(err => console.log(err));
    axios.post('http://localhost:4003/events', event).catch(err => console.log(err));

    res.send({ status: 'Ok' });
});

app.listen(4005, () => {
    console.log('Event bus listening on port 4005');
});