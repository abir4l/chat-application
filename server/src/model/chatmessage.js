const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema

const chatMessage = new Schema({

    message: { type: String, required: true },
    sender: { type: mixed,  required: true },
    reciever: { type: mixed, required: true },
    

});

module.exports = mongoose.model('Chat', chatMessage);