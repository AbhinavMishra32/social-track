const express = require("express");
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    console.log('This is the result the server got: ' + JSON.stringify(req.body));
    const {username, password} = req.body;
    //creating user in database:
    try{
        const response = await User.create({username,password})
        console.log("user created successfully! " + "User data: ", response);
        res.json({status: 'OK'});
    }
    catch(err){
        if(err.code === 11000){
            res.status(409).json({message: 'Username already exists'});
        }
        else{
            res.status(500).json({message: 'Something went wrong'});
        }
    }
    
})

app.post('/api/login', async(req, res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username}).lean();

    if(!user){
        return res.json({status: 'error', error: 'Invalid username/password'})
    }

    if(username === user.username && password === user.password){
        console.log("Credentials matched");
        console.log('You can login now!')
        return res.json({status: 'Credentials matched'});
    }
    res.json({status: 'Username found in database'});

})

// app.post('/api/logout', async(req, res) =>{
    
// });
