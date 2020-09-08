const express = require('express');
const group = express.Router();
const newGroup = require('../../database/Group');
const editUser = require('../../database/User');
const mongoose = require('mongoose');

group.post('/api/groups/create', (req, res) => {
    if (req.user) {
        const name = req.body.name
        const description = req.body.description
        const address = req.body.address

        new newGroup({
            _id: mongoose.Types.ObjectId(),
            name: name,
            description: description,
            address: address,
            owner: req.user.username
        }).save().then(d => {
            editUser.findByIdAndUpdate(req.user.username, {
                neighborhood: d._id
            }).then(res.send(JSON.stringify({ success: true, groupData: d})));
        });
    } else {
        res.sendStatus(401);
    };
});

module.exports = group;
