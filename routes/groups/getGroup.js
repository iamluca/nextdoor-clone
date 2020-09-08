const express = require('express');
const getGroup = express.Router();
const getGroupDB = require('../../database/Group');
const getUser = require('../../database/User');
const getPosts = require('../../database/Post');

getGroup.get('/api/users/me/group', (req, res) => {
    if (req.user) {
        getUser.findById(req.user.username, (err, info) => {
            getGroupDB.findById(info.neighborhood, (err, group) => {
                getPosts.find({neighborhood_id: info.neighborhood}, (err, data) => {
                    res.send(JSON.stringify({group: group, posts: data}))
                });
            });
        });
    } else {
        res.sendStatus(401);
    };
});

module.exports = getGroup;
© 2020 GitHub, Inc.
