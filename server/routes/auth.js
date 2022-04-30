var express = require('express');
const passwords = require('../.password.js')
var passport = require('passport');
var LocalStrategy = require('passport-local');
const cors = require('cors');

var mongoose = require("mongoose");
var User = require('../models/user-model.js');
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";

var router = express.Router();
router.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
function verify(email, password, cb) {
    mongoose.connect(uri, function(err) {
        if (err) { return cb(err); }
    });
    User.findOne({ email: email }, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false, { message: 'Incorrect email or password.' }); }

        user.comparePassword(password, function(err, isMatch) {
            if (err) { return cb(err); }
            if (!isMatch) { return cb(null, false, { message: 'Incorrect email or password.' }); }
            return cb(null, user) 
        });
    });
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user._id, email: user.email });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
      if (!req.user) { res.json({ error: req.err }) }
      res.json( { user: {
          user: req.user._id,
          email: req.user.email,
          name: req.user.name,
      }})
  });

router.post('/logout', function(req, res, next) {
    req.logout();
    res.json({ user: null});
});

router.all('/checklogin', function(req, res) {
    console.log(req.session)
    res.status(req.session.passport.user ? 200 : 401).send('OK')
});

const createUser = async function (userinfo, cb) {
    mongoose.connect(uri, function(err) {
        if (err) throw err;
    });

    var user = await User.findOne({ email: userinfo.email });
    if (user) return cb('user_exists');

    var newuser = new User(userinfo);
    try {
        var userid = await newuser.save();
        return cb(null, newuser);
    }
    catch (err) {
        return cb(err)
    }
};

router.post('/signup', function(req, res, next) {
    var userinfo = req.body
    createUser(userinfo, function(err, user) {
        if (err) {
            res.json( {error: err})
        }
        else {
            req.login(user, function(err) {
                if (err) { res.json( {error: err }) }
                res.json( { user: {
                    user: user._id,
                    email: user.email,
                    name: user.name,
                  }
                });
            })
        }
    });
});

module.exports = router;