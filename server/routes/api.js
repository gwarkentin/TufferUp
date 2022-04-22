var express = require('express');
const passwords = require('./../.password.js')
var passport = require('passport');

const cors = require('cors');

var mongoose = require("mongoose");
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";
var {Post, Category, Condition, Image} = require('../models/post-model.js');
const { ObjectId, ObjectID } = require('bson');

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

router.post('/post/add', (req,res) => {
  console.log('receive post req');
  var newpost = new Post(req.body);
  newpost.save().then(savedDoc => {
    res.json({postID: savedDoc._id})
  }).catch(err => {
    console.log(err)
    res.json({error: err})
  });
});

router.get('/post/get/:id', (req,res) => {
  Post.findOne({_id: { _id: req.params.id}}).
  populate('category condition').
  exec(function(err,post) {
    if (err) {res.json({error:err})}
    else {
      res.json( {post: post});
    }
  });
});

router.post('/post/delete/:id', (req,res) => {
  console.log('req to delete: ' + req.params.id)
  Post.findByIdAndDelete(req.params.id, function(err, post) {
    if (err) {res.json({error:err})}
    else {
      if (post.imgs) {
        if (Array(post.imgs).length > 1) {
          const imgs = post.imgs.map(img => ObjectID(String(img))) //weird that I had to do this. img was a =  new ObjectID(':id')
          Image.deleteMany({ _id: { $in: imgs } }) // I feel like this should happen asynchronosly, no need for user to wait
        }
        else {
          const img = ObjectID(String(post.imgs))
          Image.deleteOne({ _id: img }) // I feel like this should happen asynchronosly, no need for user to wait
        }
      }
      res.json( {postid: post._id});
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
      var namedcats = {};
      cats.forEach(cat => namedcats[cat._id] = cat );
      res.json( {categories: namedcats});
    }
  });
});

router.post('/condition/add', (req,res) => {
  const newcat = new Condition({ condition: req.body.condition });
  newcat.save().then(savedDoc=> {
    res.json({msg: 'created condition: '+ savedDoc.condition});
  }).catch(err=>{
    console.log(err)
    res.json({error: err})
  });
});

router.get('/condition/all', (req,res) => {
  Condition.find(function(err,conds) {
    if (err) {res.json({error:err})}
    else {
      var namedconds = {};
      conds.forEach(cond => namedconds[cond._id] = cond );
      res.json( {conditions: namedconds});
    }
  });
});

router.get('/posts/', (req,res) => {
  Post.find({}).limit(50).populate('user').sort('-createdDate').exec(function(err,posts) {
    console.log(err)
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

router.get('/posts/category/:category', (req,res) => {
  Post.find( { category: req.params.category}).limit(50).populate('user').sort('-createdDate').exec( function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

router.get('/posts/condition/:condition', (req,res) => {
  Post.find( { condition: req.params.condition}).limit(50).populate('user').sort('-createdDate').exec(function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
})

router.get('/posts/user/:userid', (req,res) => {
  Post.find( { user: req.params.userid }).limit(50).populate('user').sort('-createdDate').exec(function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

router.get('/image/get/:id', (req,res) => {
  const imageid = ObjectId(req.params.id)
  Image.findById(imageid).exec((err,image)=> {
    if (err) {
      console.log('error: ' + err)
      res.json({error:err})
    }
    else {
      console.log('sending data for image: ' + image._id)
      res.json({image: image.image});
    }
  });
});

router.post('/image/delete/:id', (req,res) => {
  const imageid = ObjectId(req.params.id)
  Image.findOneAndDelete({ _id: imageid }).then(function(err,image) {
    if (err) {res.json({error:err})}
    else {
      res.json( {image: image._id});
    }
  });
});

router.post('/image/add', (req,res) => {
  console.log('receive image req');
  var newimage = new Image({image: req.body.image });
  newimage.save().then(image => {
    console.log('sending imageid: '+ image._id)
    res.json({image: image._id})
  }).catch(err => {
    res.json({error: err})
  });
});

module.exports = router;