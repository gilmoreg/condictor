import express from 'express';
import session from 'express-session';
import passport from 'passport';
import User from '../models/User';
import { DATABASE_URL } from '../config';

const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password', passReqToCallback: true },
  (req, username, password, callback) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return callback(err);
      }
      // No user found with that username
      if (!user) {
        return callback(null, false);
      }
      // Make sure the password is correct
      return user.validatePassword(password, user.password, (error, isMatch) => {
        if (error) {
          return callback(error);
        }
        // Password did not match
        if (!isMatch) {
          return callback(null, false);
        }
        // Success
        return callback(null, user);
      });
    });
  },
));

router.use(session(
  {
    secret: 'keyboard puma',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ url: DATABASE_URL }),
  },
));
router.use(passport.initialize());
router.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = router;
