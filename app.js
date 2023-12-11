const express = require("express");
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const uri = process.env.API_KEY;
const PORT = process.env.PORT;

const User = require('./model/user');

async function start(){
    try{
        await mongoose.connect(uri);
        app.listen(PORT, () =>{
            console.log("Connected to Mongo DB");
            console.log(`App listening at ${PORT}`);
        })
    }
    catch(err){
        console.log(err.message);
    }
}

start();

app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: 'public'})
  })

app.get('/register', (req, res) =>{
// res.sendFile('public/login/login.html'); //cant work since it doesnt work with relative path. needs full path
res.sendFile(path.join(__dirname, 'public/login/register.html'));
})

app.get('/login', (req, res) =>{
// res.sendFile('public/login/login.html'); //cant work since it doesnt work with relative path. needs full path
res.sendFile(path.join(__dirname, 'public/login/signin.html'));
})

app.post('/api/register', async(req, res) =>{
    console.log('This is the result the server got: ')
})