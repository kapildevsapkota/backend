const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');


app.use(bodyParser.json());



app.use("/posts", postsRoute); 
app.use("/user", userRoute);


module.exports = app;
