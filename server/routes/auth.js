var express = require('express');
const passwords = require('./../.password.js')

var passport = require('passport');
var LocalStrategy = require('passport-local');

var mongoose = require("mongoose");
var User = require('./../models/user-model.js');
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";

var router = express.Router();

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

router.get('/login', function(req, res, next) {
  req.logout();
  res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});


const createUser = async function (userinfo, cb) {
    mongoose.connect(uri, function(err) {
        if (err) throw err;
    });

    var user = await User.findOne({ email: userinfo.email });
    if (user) return cb('user_exists');

    var newuser = new User(userinfo);
    var userid = await newuser.save();
    return cb(null, newuser);
};

router.get('/signup', function(req, res, next) {
  req.logout();
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
    var userinfo = { email: req.body.email, password: req.body.password}
    createUser(userinfo, function(err, user) {
        if (err == 'user_exists') {
            res.redirect('/login')
        }
        else {
            req.login(user, function(err) {
                if (err) { return next(err); }
                res.redirect('/');
            })
        }
    });
});

module.exports = router;