const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI)
    .then((data)=>console.log(`server run on port ${data.connection.host}`))
    .catch((err)=>{
         console.log(err.message);
    });
}

module.exports = connectDatabase