const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongo, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('open', () => console.log('Connected to database.'));

const app = express();

app.use(express.json());

const jwt = require('express-jwt');

const signUp = require('./routes/user/signup');
const getUser = require('./routes/user/getUser');
const login = require('./routes/user/login');
const createGroup = require('./routes/groups/createGroup');
const deleteGroup = require('./routes/groups/deleteGroup');
const joinGroup = require('./routes/groups/joinGroup');
const getGroup = require('./routes/groups/getGroup');
const posts = require('./routes/groups/Posts');

app.use(jwt({
    secret: config.secret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
}));
app.use(signUp);
app.use(getUser);
app.use(login);
app.use(createGroup);
app.use(deleteGroup);
app.use(posts);
app.use(joinGroup);
app.use(getGroup);

app.listen(5000, () => console.log('Backend listening on port: 5000.'));
