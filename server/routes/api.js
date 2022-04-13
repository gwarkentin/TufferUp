var express = require('express');
const passwords = require('./../.password.js')
var passport = require('passport');

const cors = require('cors');
const dbhandler = require('./../models/dbhandler')

var mongoose = require("mongoose");
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";
var {Post, Category, Condition, Image} = require('../models/post-model.js');

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

router.post('/post/:id/delete', (req,res) => {
  Post.deleteOne({_id: { _id: req.params.id}}, function(err, post) {
    if (err) {res.json({error:err})}
    else {
      res.json( {post: post});
    }
  });
});


router.post('/category/add', (req,res) => {
  console.log(req.body);
  const category = req.body.category;
  const subcategories = req.body.subcategories
  const keyedsubcats = []
  subcategories.forEach(subcat=>{
    keyedsubcats.unshift({"subcategory": subcat })
  })
  const cat = {
    category: category,
    subcategories: keyedsubcats
  }
  const newcat = new Category(cat);
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

router.get('/posts/', (req,res) => {
  Post.find({},'creationDate title price imgs').limit(5).sort('-createdDate').exec(function(err,posts) {
    console.log(err)
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

router.get('/posts/category/:category', (req,res) => {
  Post.find( { category: req.params.category}, function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

router.get('/posts/condition/:condition', (req,res) => {
  Post.find( { condition: req.params.condition}, function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
})

router.get('/posts/user/:userid', (req,res) => {
  Post.find( { user: req.params.userid }, function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

router.get('/image/:id', (req,res) => {
  Image.findOne({_id: { _id: req.params.id}}).then(function(err,post) {
    if (err) {res.json({error:err})}
    else {
      res.json( {post: post});
    }
  });
});

router.post('/image/add', (req,res) => {
  console.log('receive image req');
  console.log(req.body.image);
  var newimage = new Image({image: req.body.image});
  newimage.save().then(image => {
    res.json({image: image._id})
  }).catch(err => {
    console.log(err)
    res.json({error: err})
  });
});


module.exports = router;