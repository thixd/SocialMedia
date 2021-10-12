import React, { useState } from "react";

import '../../assets/css/style.css'

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