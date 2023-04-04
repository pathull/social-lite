# Social-lite is a social media app that focuses on the core features to be used amongst friends, family, and colleagues without a cluttered UI/UX. Users can post text and media, as well as like and comment on other users’ posts. Add/delete friends. 


<p align="center">
  <img src="https://user-images.githubusercontent.com/94504789/228952097-3f91e966-130a-44d7-b5cf-97b78df9fcfd.jpg" />

  <img src="https://user-images.githubusercontent.com/94504789/228952154-4e7b8bcf-c8c3-4713-ac46-e3a739232ad2.jpg" />

  <img src="https://user-images.githubusercontent.com/94504789/228952202-3c1c5271-60ba-4cee-ad4f-11b3c01cdc6d.jpg" />
</p>

## Getting started
1. Clone the repo
```shell
git clone https://github.com/pathull/social-lite.git
cd social-lite
```

2. Run command to install dependencies in both backend and frontend
```shell
cd client
npm install
cd server
npm install
```

### Backend
1. Server is using Mongo database, You should create a database with the name of your preferences and create a .env file with the following keys. Follow below instructions if you wish to populate app with available mock data.
```js

//Example
MONGO_URL = 'mongodb://localhost:27017'
PORT=3001
JWT_SECRET='anythingyouwantittobe'


//Server has mock data available upon starting app. Uncomment the following code in server -> index.js and run it only once to populate your db with mock data.

//lines 17-19
//import User from "./models/User.js";
//import Post from "./models/Post.js";
//import { users, posts } from "./data/index.js";

//lines 66-67
// User.insertMany(users);
// Post.insertMany(posts);
```

2. Run development server
```shell
nodemon
```

3. Run development client
```shell
npm start
```
