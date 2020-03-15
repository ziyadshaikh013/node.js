const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const stuffRouter = require('./router/stuff');
const userRoute = require('./router/user')


let mongoDb = process.env.MONGODB_URL || 'mongodb+srv://ziyad:u5cVt2TFRvpA6tbB@cluster0-tnkys.mongodb.net/test';

mongoose.connect(mongoDb, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.log(error);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRouter);
app.use('/api/auth', userRoute);



module.exports = app;