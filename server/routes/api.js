var express = require('express');
const passwords = require('./../.password.js')
var passport = require('passport');

const dbhandler = require('./../models/dbhandler')

var router = express.Router();


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

// -------- These are helper functions for /api/newpost -------------

  /* -- !need to implement!
    dbhandler.verifyPost(post)
    validates post data object has correct shape and fields before insert into db
  */

// a post request receiving input from a form.
// Right now it just sends it back to the sender as is and posts in your terminal.
router.post('/newpost', (req,res) => {
  /* -- !need to implement!
 use the helper functions above to first
  1) verify the post,
  2) if good, submit it
  3) send back result either way
  
  If there are errors on either one, send back to the user the error message
  A try/catch logic may be better here.

 send obj that looks like this for frontend:
    {
      "success": Boolean,
      "postID": String,  // 0 on failure
      "error": String // "" if success = true, "warning description" if some warning
    }
*/
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