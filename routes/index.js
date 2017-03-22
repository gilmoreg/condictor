import { schema, root } from '../graphql/schema';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const passport = require('passport');


const router = express.Router();

// router.use(require('./passport'));

router.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.status(200).json({ message: 'Login successful' });
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = { router };
