const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json())
const cors = require('cors')

app.use(cors({
    credentials:true,
    origin:true
}))

const router = require('./Routes/allRoutes');

app.use('/Uploads',express.static(path.join(__dirname,'Uploads')))
app.use(router); 
module.exports = app;