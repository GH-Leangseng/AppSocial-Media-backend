const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//get api from Route
const authRoute = require('./Routes/authRoute')
const friend = require('./Routes/routeFriend')
const post = require('./Routes/postRoute')
// import middleware
const authMiddleware = require('../src/Middleware/authMiddleware')

//connect with file .env
dotenv.config();

// middlewere
app.use(express.json());
//allow browser can provide data api
app.use(cors());
require('./db') //call database connected

const path = require('path');
// __dirname // បង្ហើយDirectory ដែលយើងកំពុងឈ
app.use(express.static(path.join(__dirname,'../uploads'))) //use with satic is mean we can access in browser

app.listen(process.env.PORT,()=>{
        console.log("server run on port " + process.env.PORT);
})
// 
app.use('/auth',authRoute);
app.use('/friend',authMiddleware,friend); //input middleware
app.use('/post',authMiddleware,post); //input middleware

