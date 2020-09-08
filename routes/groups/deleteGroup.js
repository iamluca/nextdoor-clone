const express = require('express');
const deleteGroup = express.Router();
const delGroup = require('../../database/Group');

deleteGroup.delete('/api/groups/delete', (req, res) => {
    if (req.user) {
        const id = req.body.id
    
        delGroup.findById(id, (err, data) => {
            if (data.owner === req.user.username) {
                delGroup.findByIdAndDelete(id).then(() => {
                    res.send(JSON.stringify({success: true}));
                });
            } else {
                res.sendStatus(401);
            };
        });
    } else {
        res.sendStatus(401);
    };
});

module.exports = deleteGroup;
