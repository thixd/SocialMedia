import React from 'react';
import Dropdown from '../helpers/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeletePostMutation from '../mutations/deletePost';

const DeleteButton = ({deletePost, postId}) => 
    <button onClick={() => {
        deletePost({ variables: { postId } })
    }}>
        Delete Post
    </button>

export default ({post, changeState}) => 
    <div className="header">
        <img src={post.user.avatar} />
        <div>
            <h2>{post.user.username}</h2>
        </div>
            <button onClick={changeState}>Edit Post</button>
            <DeletePostMutation post={post}>
                <DeleteButton />
            </DeletePostMutation>
        
    </div>