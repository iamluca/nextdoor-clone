const mongoose = require('mongoose');
const post = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    neighborhood_id: String,
    description: String,
    title: String,
    author: Object
});

const newpost = mongoose.model('posts', post);

module.exports = newpost;
