const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema

const userSchema = new Schema({

    name: { type: String, required: true },
    username: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },

});

/**
 *
 * @type {((typedArray: (Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array), index: number, value: number) => number) | (() => string)}
 */
module.exports = mongoose.model('User', userSchema);