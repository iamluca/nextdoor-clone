const express = require('express');
const login = express.Router();
const authUser = require('../../database/User');
const auth = require('jsonwebtoken');
const config = require('../../config');

login.post('/api/users/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email) {
        res.send(JSON.stringify({ "success": false,  "error": "Please provide an email!" }));
    } else if (!password) {
        res.send(JSON.stringify({ "success": false,  "error": "Please provide a password!" }));
    } else {
        authUser.findOne({email: email}, (err, data) => {
            if (data) {
                if (password === data.password) {
                    const token = auth.sign({ username: data._id }, config.secret)
                    res.send(JSON.stringify({ "success": true,  "token": token }))
                } else {
                    res.send(JSON.stringify({ "success": false,  "error": "Incorrect password!"}))
                };
            } else {
                res.send(JSON.stringify({ "success": false,  "error": "Seems that no such email exists!" }));
            };
        });
    };
});

module.exports = login;
