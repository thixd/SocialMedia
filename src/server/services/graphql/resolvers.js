import Sequelize from 'sequelize';

const Op = Sequelize.Op;

export default function resolver() {
  const { db } = this;
  const { Post, User } = db.models;
  const resolvers = {
    Post:{
      user(post, args, context){
        return post.getUser();
      }
    },
    RootQuery: {
        posts(root, args, context) {
          return Post.findAll({order: [['createdAt', 'DESC']]});
        },
        postsFeed(root, { page, limit }, context) {
          var skip = 0;
        
          if(page && limit) {
            skip = page * limit;
          }
        
          var query = {
            order: [['createdAt', 'DESC']],
            offset: skip,
          };
        
          return {
           posts: Post.findAll(query)
          };
      },
      usersSearch(root, { page, limit, text }, context) {
        if(text.length < 3) {
            return {
                users: []
            };
        }
        var skip = 0;
        if(page && limit) {
            skip = page * limit;
        }
        var query = {
            order: [['createdAt', 'DESC']],
            offset: skip,
        };
        if(limit) {
            query.limit = limit;
        }
        query.where = {
            username: {
                [Op.like]: '%' + text + '%'
            }
        };
        return {
            users: User.findAll(query)
        };
      },
    },
    RootMutation: {
      addPost(root, { post }, context) {
        return User.findAll().then((users) => {
            const usersRow = users[0];
            
            return Post.create({
                ...post,
            }).then((newPost) => {
                return Promise.all([
                    newPost.setUser(usersRow.id),
                ]).then(() => {
                    return newPost;
                });
            });
        });
      },
      updatePost(root, { post, postId }, context) {
        return Post.update({
            ...post,
        },
        {
            where: {
                id: postId
            }
        }).then((rows) => {
            if(rows[0] === 1) {
                console.log("post updated")
                return Post.findById(postId);
            }
        });
      },
      deletePost(root, { postId }, context) {
          return Post.destroy({
            where: {
              id: postId
            }
          }).then(function(rows){
              if(rows === 1){
                  return {
                      success: true
                  };
              }
              return {
                  success: false
              };
          }, function(err){
            console.log("error")
          });
        }
      }
    }
  return resolvers;
}