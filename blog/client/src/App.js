import React from 'react';
import PostCreate from './PostCreate';
import PostsList from './PostsList';

const App = () => {
    return <div className="container">
        <h1>Create new post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostsList />
    </div>;
}

export default App;