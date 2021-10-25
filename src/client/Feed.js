// import React, { useState } from "react";
// import gql from 'graphql-tag';
// import '../../assets/css/style.css'
// import { Query, Mutation } from "react-apollo";
// import InfiniteScroll from 'react-infinite-scroller';
// import Loading from './components/loading'

// const GET_POSTS = gql`
//   query postsFeed($page: Int, $limit: Int) { 
//     postsFeed(page: $page, limit: $limit) { 
//       posts {
//         id
//         text
//         user {
//           avatar
//           username
//         }
//       }
//     }
//   }
// `;

// const ADD_POST = gql`
//   mutation addPost($post : PostInput!) {
//     addPost(post : $post) {
//       id
//       text
//       user {
//       username
//       avatar
//     }
//   }
// }`;

// const UPDATE_POST = gql`
//   mutation updatePost($post : PostInput!, $postId : Int!) {
//       updatePost(post : $post, postId : $postId) {
//           id
//           text
//       }
// }`;

// export default function Feed() {
//   //const [posts, setPosts] = useState();
//   const [postContent, setPostContent] = useState();
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(0);

//   function handlePostContentChange(event) {
//     setPostContent(event.target.value)
//   }

//   // function handleSubmit(event) {
//   //   event.preventDefault();
//   //   const newPost = {
//   //       id: posts.length + 1,
//   //       text: postContent,
//   //       user: {
//   //           avatar: '/uploads/avatar3.png',
//   //           username: 'Fake User'
//   //       }
//   //   };
//   //   setPosts([newPost, ...posts]),
//   //   setPostContent('')
//   // }
//   function loadMore(fetchMore){
//     fetchMore({
//       variables: {
//         page: page+1, // sent with request
//       },
//       updateQuery(previousResult, { fetchMoreResult }) {
//         if(!fetchMoreResult.postsFeed.posts.length) {
//           setHasMore(false)
//           return previousResult;
//         }
   
//         setPage(page+1)
        
//         const newData = {
//           postsFeed: {
//             __typename: 'PostFeed',
//             posts: [
//               ...previousResult.postsFeed.posts,
//               ...fetchMoreResult.postsFeed.posts
//             ]
//           }
//         };
//         return newData;
//       }
//     });
//   }

//   return (
//     <Query query={GET_POSTS} variables={{page: 0, limit: 10}}>
//       {({ loading, error, data, fetchMore }) => {
//         if (loading) return <Loading/>
//         if (error) return error.message;

//         const { postsFeed } = data;
//         const { posts } = postsFeed;

//         return (
//           <div className="container">
//               <div className="postForm">
//                   <Mutation mutation={ADD_POST}
//                       update = {(store, { data: { addPost } }) => {
//                           const variables = { page: 0, limit: 10 };
//                           const data = store.readQuery({ query: GET_POSTS, variables });
//                           data.postsFeed.posts.unshift(addPost);
//                           store.writeQuery({ query: GET_POSTS, variables, data });
//                       }}
//                       optimisticResponse= {{
//                           __typename: "Mutation",
//                           addPost: {
//                               __typename: "Post",
//                               text: postContent,
//                               id: -1,
//                               user: {
//                                   __typename: "User",
//                                   username: "Loading...",
//                                   avatar: "/public/loading.gif"
//                               }
//                           }
//                       }}>
//                           {addPost => (
//                               <form onSubmit={e => {
//                                   e.preventDefault();
//                                   addPost({ variables: { post: { text: postContent } } }).then(() => {
//                                       setPostContent('')
//                                   });
//                                   }}>
//                                 <textarea value={postContent} onChange={handlePostContentChange} placeholder="Write your custom post!"/>
//                                 <input type="submit" value="Submit" />
//                               </form>
//                           )}
//                   </Mutation>
//               </div>
//               <div className="feed">
//                   <InfiniteScroll
//                       loadMore={() => loadMore(fetchMore)}
//                       hasMore={hasMore}
//                       loader={<div className="loader" key={"loader"}>Loading ...</div>}
//                   >
//                       {posts.map((post, i) =>
//                           <div key={post.id} className={"post " + (post.id < 0 ? "optimistic": "")}>
//                               <div className="header">
//                                   <img src={post.user.avatar} />
//                                   <h2>{post.user.username}</h2>
//                               </div>
//                               <p className="content">
//                                   {post.text}
//                               </p>
//                           </div>
//                       )}
//                   </InfiniteScroll>
//               </div>
//           </div>
//         )
//     }}
//     </Query>
//   )
// }

import React, { Component } from 'react';
import PostsQuery from './components/queries/postsFeed';
import AddPostMutation from './components/mutations/addPost';
import FeedList from './components/post/feedlist';
import PostForm from './components/post/form';

export default function Feed (){
  const query_variables = { page: 0, limit: 10};

  return (
    <div className="container">
      <AddPostMutation variables={query_variables}>
        <PostForm />
      </AddPostMutation>
      <PostsQuery variables={query_variables}>
        <FeedList/>
      </PostsQuery>
    </div>
  )
}