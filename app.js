require('dotenv').config;
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

const routerPost = require('./routers/posts.js');

app.use(express.json());

app.use('/posts', routerPost);

app.listen(port, () => {
    console.log('Server online')
});