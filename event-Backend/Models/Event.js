const mongoose = require('mongoose');

const event = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    }
})

const eventDetails = mongoose.model('eventDetail',event);
module.exports = eventDetails;