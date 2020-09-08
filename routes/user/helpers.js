const fetchUser = require('../../database/User');

const get_user = (username) => {
    fetchUser.findById(username, (err, data) => {
        return data;
    });
};

module.exports = { get_user };
