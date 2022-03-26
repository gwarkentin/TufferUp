
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbhandler = require('./dbhandler');

const app = express();


app.use(bodyParser.json({ limit: '500kb'})); //read json input from requests
app.use(express.urlencoded({ extended: true })); // read web form input
app.use(cors());

app.get('/api', (req, res) => {
    res.send("hello it's the api here");
});

app.get('/api', (req, res) => {
  res.send("hello it's the api here");
});

// need to connect to auth.js
app.post('/api/register', (req, res) => {
  console.log("register: " + JSON.stringify(req.body));
});

/*
app.get('/api/category', (req, res) => {
  filters = {
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
      console.log(JSON.stringify(dbres));
      res.json(dbres);
    })
    .catch(function (error) {
      res.json({
        'documents':null,
        'error': "From node.js index.js[45]: " + error.message 
      });
    });
});
*/
app.get('/api/category/:category', (req, res) => {
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
      // console.log(JSON.stringify(dbres)); // makes very slow
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
app.get('/api/post/:id', (req, res) => {
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


app.post('/api/newpost', (req,res) => {
/*
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
  // console.log('receive post req');
  // console.log(req.body); // slow for image uploads
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

app.listen(3001, console.log("Server listening on port 3001. Try http://localhost:3001/api/category/Books"));