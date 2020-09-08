const mongoose = require('mongoose');
const newUser = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    neighborhood: String
});

const newuser = mongoose.model('users', newUser);

module.exports = newuser;
