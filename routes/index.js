import express from 'express';
import graphqlHTTP from 'express-graphql';
import passport from 'passport';
import { schema, root } from '../graphql/schema';
import * as loaders from '../graphql/loaders';

const router = express.Router();

/* eslint-disable consistent-return */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

router.use(require('./passport'));

router.use('/graphql', isAuthenticated, graphqlHTTP({
  context: { loaders },
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

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = { router };
