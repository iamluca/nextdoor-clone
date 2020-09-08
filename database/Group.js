const mongoose = require('mongoose');
const groups = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    address: String,
    owner: String
});

const newgroup = mongoose.model('groups', groups);

module.exports = newgroup;
