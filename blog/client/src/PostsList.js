import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import axios from 'axios';

const PostsList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res  = await axios.get('http://localhost:4000/posts');

        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Get array of values of the object
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div 
                className="card" 
                style={{ width: '30%', marginBottom: '20px'}}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
        )
    });
    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>;
}

export default PostsList;