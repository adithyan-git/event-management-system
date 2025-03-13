const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path:'config.env'});
const dataBaseConnection = require('./databaseConection')
dataBaseConnection();

app.listen(process.env.PORT,()=>{
    console.log(`server run on Port ${process.env.PORT}` );
    
})