import express from 'express';
import session from 'express-session';
import passport from 'passport';
import User from '../models/User';

const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

passport.use(new LocalStrategy(
  (username, password, callback) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return callback(err);
      }
      // No user found with that username
      if (!user) {
        return callback(null, false);
      }
      // Make sure the password is correct
      user.validatePassword(password, (error, isMatch) => {
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
      return callback('Unknown error in Passport strategy');
    });
  },
));

router.use(session(
  {
    secret: 'keyboard puma',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.DATABASE_URL }),
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
