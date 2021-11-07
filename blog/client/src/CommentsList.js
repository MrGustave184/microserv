import React from 'react';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CommentsList = ({ postId }) => {
const CommentsList = ({ comments }) => {
    // const [comments, setComments] = useState([]);

    // const fetchData = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

    //     setComments(res.data);
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    if(! comments)
        comments = [];

    const renderedComments = comments.map(comment => {
        let content = '';
        if(comment.status === 'pending') {
            content = 'Comment awaiting for moderation';
        }

        if(comment.status === 'rejected') {
            content = 'Comment rejected';
        }

        if(comment.status === 'approved') {
            content = comment.content;
        }

        return <li key={comment.id}>{content}</li>;
    });

    return <ul>
        {renderedComments}
    </ul>;
};

export default CommentsList;
