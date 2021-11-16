const { randomBytes } = require('crypto');
const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const app = express();
app.use(cors());
// As body parser is deprecated
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// extended true allows you to post nested objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// store all the posts in memory
const posts = {};

app.get('/', (req, res) => {
    res.send({ status: 'ok' });
});

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title };

    await axios
        .post('http://event-bus-srv:4005/events', {
            type: 'PostCreated',
            data: { id, title },
        })
        .catch((err) => console.log(err));

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received event', req.body);

    res.send({});
});

app.listen(4000, () => {
    console.log('new version v2');
    console.log('Posts service is listening on port 4000');
});
