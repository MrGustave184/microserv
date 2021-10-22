const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    
    if(type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if(type === 'CommentCreated') {
        const { id, postId, content, status } = data;
        const post = posts[postId];

        post.comments.push({ id, content, status });
    }

    if(type === 'CommentUpdated') {
        console.log('CommentUpdated', req.body)
        const { id, postId, content, status } = data;

        const post = posts[postId];

        const comment = post.comments.find(comment => comment.id == id);
        comment.status = status;

        // We also update the content because CommentUpdated is a generic comment update event
        // so we dont know what properties of the comment are being updated so we update everything
        comment.content = content;
    }

    console.log(posts);

    res.send({});
})

app.listen(4002, () => {
    console.log('Query services listening on port 4002');
})