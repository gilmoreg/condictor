import express from 'express';
import graphqlHTTP from 'express-graphql';
import passport from 'passport';
import { schema, root } from '../graphql/schema';
import * as loaders from '../graphql/loaders';
import User from '../models/User';

const router = express.Router();

/* eslint-disable consistent-return */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ message: 'Not authenticated.' }).end();
};

router.use(require('./passport'));

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.status(200).json({ message: 'Login successful', user: req.user.username });
  },
);

router.post('/signup', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'No request body' });
  }
  if (!('username' in req.body)) {
    return res.status(422).json({ message: 'Missing field: username' });
  }
  let { username, password } = req.body;
  if (typeof username !== 'string') {
    return res.status(422).json({ message: 'Incorrect field type: username' });
  }
  username = username.trim();
  if (username === '') {
    return res.status(422).json({ message: 'Incorrect field length: username' });
  }
  if (!(password)) {
    return res.status(422).json({ message: 'Missing field: password' });
  }
  if (typeof password !== 'string') {
    return res.status(422).json({ message: 'Incorrect field type: password' });
  }
  password = password.trim();
  if (password === '') {
    return res.status(422).json({ message: 'Incorrect field length: password' });
  }
  // check for existing user
  return User
    .find({ username })
    .count()
    .exec()
    .then((count) => {
      if (count > 0) {
        throw new Error('username already taken');
      }
      // if no existing user, hash password
      return User.hashPassword(password);
    })
    .then(hash =>
      User.create({
        username,
        password: hash,
      }),
  )
  // If signup is successful, automatically log in
  .then((user) => {
    req.login(user, (err) => {
      if (!err) {
        return res.status(201).json({ message: 'Signup and login successful',
          user: user.username });
      }
      throw new Error(`${err}`);
    });
  })
  .catch((err) => {
    res.status(500).json({ message: 'Internal server error', details: `${err}` });
  });
});

router.get('/check', (req, res) => {
  const user = (req.user && req.user.username) ? req.user.username : null;
  res.status(200).json({ user });
});

router.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

router.use('/graphql', isAuthenticated, graphqlHTTP({
  context: { loaders },
  schema,
  rootValue: root,
  graphiql: true,
}));

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.json({ logoutSuccess: true }); // .redirect('/nowhere');
});

module.exports = { router };

