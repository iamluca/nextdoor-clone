const express = require('express');
const signup = express.Router();
const newUser = require('../../database/User');
const auth = require('jsonwebtoken');
const config = require('../../config');

signup.post('/api/users/create', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username
    const name = req.body.name

    if (!email) {
        res.send(JSON.stringify({ "success": false,  "error": "Please provide a email!" }));
    } else if (!username) {
        res.send(JSON.stringify({ "success": false,  "error": "Please provide a username!" }));
    } else if (!name) {
        res.send(JSON.stringify({ "success": false,  "error": "Please provide a name!" }));
    } else if (!password) {
        res.send(JSON.stringify({ "success": false,  "error": "Please provide a password!" }));
    } else {
        newUser.findOne({_id: username}, (err, data) => {
            if (data) {
                res.send(JSON.stringify({ "success": false,  "error": "That username already exists!" }));
            } else {
                new newUser({
                    _id: username,
                    name: name,
                    email: email,
                    password: password,
                    managed: null
                }).save().then(d => {
                    const token = auth.sign({ username: d._id }, config.secret);
                    res.send(JSON.stringify({ "success": true, "token": token }));
                });
            };
        });
    };
});

module.exports = signup;
