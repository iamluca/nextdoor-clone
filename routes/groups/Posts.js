const express = require('express');
const post = express.Router();
const newPost = require('../../database/Post');
const getUser = require('../../database/User');
const mongoose = require('mongoose');

post.post('/api/posts/create', (req, res) => {
    if (req.user) {
        const title = req.body.title
        const description = req.body.description
        getUser.findById(req.user.username, (err, data) => {
            new newPost({
                _id: mongoose.Types.ObjectId(),
                neighborhood_id: data.neighborhood,
                title: title,
                description: description,
                author: { name: data.name, id: req.user.username }
            }).save().then(res.send(JSON.stringify({success: true})));
        });
    } else {
        res.sendStatus(401);
    };
});

module.exports = post;
