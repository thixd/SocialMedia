import React, { useState } from "react";
import { Helmet } from "react-helmet";

import '../../assets/css/style.css'

const defaultPosts = [{
  id: 2,
  text: 'Lorem ipsum',
  user: {
      avatar: '/uploads/avatar1.png',
      username: 'Test User'
  }
},
{
  id: 1,
  text: 'Lorem ipsum',
  user: {
      avatar: '/uploads/avatar2.png',
      username: 'Test User 2'
  }
}];

export default function App() {
  const [posts, setPosts] = useState(defaultPosts);
  const [postContent, setPostContent] = useState();

  function handlePostContentChange(event) {
    setPostContent(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newPost = {
        id: posts.length + 1,
        text: postContent,
        user: {
            avatar: '/uploads/avatar3.png',
            username: 'Fake User'
        }
    };
    setPosts([newPost, ...posts]),
    setPostContent('')
  }

  return (
    <div className="container">
      {/* Helmet to control document head that appear on tab */}
      <Helmet>
        <title> Graphbook - Feed </title>
        <meta name = "description" content="Newsfeed"/>
      </Helmet>
      <div className="postForm">
        <form onSubmit={handleSubmit}>                      
          <textarea value={postContent} onChange={handlePostContentChange} placeholder="Write your custom post!"/>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="feed">
          {posts.map((post, i) => 
              <div key={post.id} className="post">
                <div className="header">
                  <img src={post.user.avatar} />
                  <h2>{post.user.username}</h2>
                </div>
                <p className="content">
                    {post.text}
                </p>
              </div>
          )}
      </div>
    </div>
  );
}