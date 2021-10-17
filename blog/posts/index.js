const { randomBytes } = require('crypto');
const express = require('express');

const app = express();

// As body parser is deprecated
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// extended true allows you to post nested objects
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// store all the posts in memory
const posts = {};

app.get('/', (req, res) => {
    res.send({ status: 'ok' });
});

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title };

    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Posts service listening on port 4000');
})