Social Media
========
Full-stack web-based application providing social media for user to share contents and also able to search for another users. Technology used: HTML, CSS, ReactJS, GraphQL, Webpack, MySQL, Apollo.

How to run
====
`npm install` to start install (node modules folder should be deleted before that)and `npm run client:build` to start client side and also `npm run server` to start server side of the root directory of this repository. Then, you can access to this project by
https://localhost:8000


Implementing description
====
Every index.js file of folder is the main file of the folder to look at. 2 main folders is `src/server` and `src/client`<br/>
Database structure looks like below: <br/>
Database schema
![Alt text](/screenshots/main_db.png "Database schema") <br/>
Attributes of User Table
![Alt text](/screenshots/user_db.png "User table") <br/>
Attributes of Post Table
![Alt text](/screenshots/post_db.png "Post table") <br/>


Demo
====
Main feed is where user can upload the post and also seeing other people post too <br/>
This is the main feed page
![Alt text](/screenshots/main.png "Main feed") <br/>
Posts can be edited and deleted as user wanted <br/>
Screen of how to edit the post, the user can edit post by click `Edit post` and click `Submit` when changing is done <br/>
![Alt text](/screenshots/edit.png "Editing and Deleting") <br/>
User can also possible to search for another user by type the name of other users. The result will be display as a list of user who the name is match<br/>
We are searching for user that name start with `Jan` in database, there are 2 users that match the result `Jane` and `Janes`
![Alt text](/screenshots/search.png "Search for other user in search bar") <br/>


