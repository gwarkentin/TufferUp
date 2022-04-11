var express = require('express');
const passwords = require('./../.password.js')
var passport = require('passport');
const cors = require('cors');

const dbhandler = require('./../models/dbhandler')

var router = express.Router();
router.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

router.get('/', (req, res) => {
    res.send("hello it's the api here");
});

router.get('/category/:category', (req, res) => {
  filters = {
    "filter": { "category": req.params.category },
    "sort": { "_id":-1, "price": 1 },
    "limit": 10,
    "projection": {
      "title":1,
      "price":1,
      "imgs":1
    }
  }
  dbhandler.getManyPosts(filters)
    .then(function (dbres) {
      res.json(dbres);
    })
    .catch(function (error) {
      res.json({
        'documents':null,
        'error': "From node.js index.js[45]: " + error.message 
      });
    });
});

router.get('/user/:user', (req, res) => {
  filters = {
    "filter": { "user": req.params.user },
    "sort": { "_id":-1, "price": 1 },
    "limit": 10,
    "projection": {
      "title":1,
      "price":1,
      "imgs":1
    }
  }
  dbhandler.getManyPosts(filters)
    .then(function (dbres) {
      res.json(dbres);
    })
    .catch(function (error) {
      res.json({
        'documents':null,
        'error': "From node.js index.js[45]: " + error.message 
      });
    });
});

// accepting get url params
router.get('/post/:id', (req, res) => {
  console.log('request for post: ' + req.params.id)
  dbhandler.getPost(req.params.id)
    .then(function (post) {
      //console.log(JSON.stringify(post));
      res.json(post);
    })
    .catch(function (error) {
      res.json({
        'document':null,
        'error': "From node.js index.js[45]: " + error.message 
      });
    });
    
});

router.post('/newpost', (req,res) => {
  console.log('receive post req');
  console.log(req.body);
  dbhandler.verifyPost(req.body).then(function (post) {
    dbhandler.addPost(post)
      .then(function ( postID) {
         res.json({
          'success': true,
          'postID': postID,
          'error': ''
        });
      })
  }).catch(function (error) {
      console.log(error)
      res.json({
        'success':false,
        'postID':null,
        'error':error
      })
    });
});

module.exports = router;