const express = require('express');
const join = express.Router();
const inviteGroup = require('../../database/Group');
const editUser = require('../../database/User');

join.post('/api/users/me/join', (req, res) => {
    if (req.user) {
        const code = req.body.invite

        console.log(req.body)

        inviteGroup.findById(code, (err, data) => {
            if (err) return res.send({"success": false, "error": "Error with database." });
            if (data) {
                editUser.findOneAndUpdate({_id: req.user.username}, {
                    neighborhood: code
                }).then(data => {
                    res.send(JSON.stringify({ success: true, username: data._id, email: data.email, name: data.name, neighborhood: data.neighborhood }));
                });
            } else {
                res.send(JSON.stringify({ success: false, error: "Neighborhood doesn't exist!"}));
            }
        });
    } else {
        res.sendStatus(401);
    };  
});

join.delete('/api/users/me/leave', (req, res) => {
    if (req.user) {
        editUser.findOneAndUpdate({_id: req.user.username}, {
            neighborhood: null
        }).then(data => {
            res.send(JSON.stringify({ success: true, username: data._id, email: data.email, name: data.name, neighborhood: data.neighborhood }));
        });
    } else {
        res.sendStatus(401);
    };  
});

module.exports = join;
