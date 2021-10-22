const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios').default;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: 'pending' });

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            postId: req.params.id,
            id: commentId,
            content,
            status: 'pending'
        } 
    }).catch(err => console.log(err));

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if(type == 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id == id;
        });

        // We dont need to insert back into the comments array as we are pulling the memory address of the comment itself
        comment.status = status;
        console.log('comment moderated', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        });

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        }).catch(err => console.log(err));
    }

    res.send({});
});

app.listen(4001, () => {
    console.log("Comments service listening on port 4001");
})