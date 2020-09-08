const express = require('express');
const getUser = express.Router();
const fetchUser = require('../../database/User');

getUser.get('/api/users/me', (req, res) => {
    if (req.user) {
        fetchUser.findById(req.user.username, (err, data) => {
            if (err) return res.send({"success": false, "error": "Error with database." });
            if (data) {
                res.send(JSON.stringify({ success: true, username: data._id, email: data.email, name: data.name, neighborhood: data.neighborhood }));
            } else {
                res.send(JSON.stringify({ success: false, error: "User doesn't exist!"}));
            }
        });
    } else {
        res.sendStatus(401);
    };  
});

module.exports = getUser;
