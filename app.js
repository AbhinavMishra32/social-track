const express = require("express");
const app = express();

app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const uri = process.env.API_KEY;
const PORT = process.env.PORT;

const User = require('.model/user');