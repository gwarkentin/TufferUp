var express = require('express');
const passwords = require('./../.password.js')
var passport = require('passport');

const cors = require('cors');
const dbhandler = require('./../models/dbhandler')

var mongoose = require("mongoose");
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";
var {Post, Category, Condition} = require('../models/post-model.js');

mongoose.connect(uri, function(err) {
    if (err) throw err;
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
  console.log('connection succesful');
});
  

var router = express.Router();
router.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

router.post('/post', (req,res) => {
  console.log('receive post req');
  var newpost = new Post(req.body);
  // newpost.validate() is automatically run before save
  newpost.save().then(savedDoc => {
    res.json({postID: savedDoc._id})
  }).catch(err => {
    console.log(err)
    res.json({error: err})
  });
});

router.get('/post/:id', (req,res) => {
  Post.findOne({_id: { _id: req.params.id}}).
  populate('category condition').
  exec(function(err,post) {
    if (err) {res.json({error:err})}
    else {
      res.json( {post: post});
    }
  });
});

router.post('/category/add', (req,res) => {
  const newcat = new Category({ category: req.data.category });
  newcat.save().then(savedDoc=> {
    res.json({msg: 'created category: '+ savedDoc.category});
  }).catch(err=>{
    console.log(err)
    res.json({error: err})
  });
});

router.get('/category/all', (req,res) => {
  Category.find(function(err,cats) {
    if (err) {res.json({error:err})}
    else {
      res.json( {categories: cats});
    }
  });
});

router.get('/category/posts/:category', (req,res) => {
  Post.find({category: { _id: req.params.category}}, 'title price imgs', function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

router.post('/condition/add', (req,res) => {
  const newcat = new Condition({ condition: req.data.condition });
  newcat.save().then(savedDoc=> {
    res.json({msg: 'created condition: '+ savedDoc.condition});
  }).catch(err=>{
    console.log(err)
    res.json({error: err})
  });
});

router.get('/condition/all', (req,res) => {
  Condition.find(function(err,cond) {
    if (err) {res.json({error:err})}
    else {
      res.json( {conditions: cond});
    }
  });
});

router.get('/condition/posts/:condition', (req,res) => {
  Post.find(function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

module.exports = router;