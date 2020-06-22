const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema
const userSchema = new Schema({

    name: { type: String, required: true },
    username: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },

});

module.exports = mongoose.model('User', userSchema);