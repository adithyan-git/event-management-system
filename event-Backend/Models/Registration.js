const mongoose = require('mongoose');

const registrationDetails = new mongoose.Schema({
        fullname:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        place:{
            type:String,
            require:true
        },
        profileImage:{
            type:String,
            require:true
        },
        status:{
            type:String,
            default:'active'
        },
        role:{
            type:String,
            default:'user'
        }
})

const registrationDetail = mongoose.model('registrationDetail',registrationDetails);
module.exports = registrationDetail