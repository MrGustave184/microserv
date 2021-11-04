const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if(type === 'CommentCreated') {
        console.log('comment to be moderated received', req.body)
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        console.log('new status', status)

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch(err => console.log(err));
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Moderation service running on port 4003');
});