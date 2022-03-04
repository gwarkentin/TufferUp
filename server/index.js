const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// middleware
app.use(bodyParser.json()); //read json input from requests
app.use(express.urlencoded({ extended: true })); // read web form input
app.use(cors());

app.get('/api', (req, res) => {
    res.send("hello it's the api here");
});

app.get('/api/post', (req, res) => {
  res.send(
    {
    "form": {
        "title": "Express id: No post selected",
        "description": "Express Api Sent this",
        "category": "Api Category",
        "condition": "Api Condition",
        "price": 1.99,
        "discountable": true,
        "imgs": ["/src/assets/palms_and_snow.jpg"]
    }
    }
  );
});

// accepting get url params
app.get('/api/post/:id', (req, res) => {
  res.send(
    {
    "form": {
        "title": "Express id:" + req.params.id,
        "description": "Express Api Sent this",
        "category": "Api Category",
        "condition": "Api Condition",
        "price": 1.99,
        "discountable": true,
        "imgs": ["/src/assets/palms_and_snow.jpg", "/src/assets/tree.jpg"]
    }
    }
  );
});

// -------- These are helper functions for /api/newpost -------------

  /* -- !need to implement!
    verifyPostIsValid(post)
    validates post data object has correct shape and fields before insert into db
  */

  /* -- !need to implement!
    addPost(post)
    returns the postID
    if failed to connect, return 0.
    ! QA should determine better ways to warn user and explain how to fix
  */

// a post request receiving input from a form.
// Right now it just sends it back to the sender as is and posts in your terminal.
app.post('/api/newpost', (req,res) => {

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
      "postID": Int,  // 0 on failure
      "error": String // "" if success = true, "warning description" if some warning
    }
*/

 console.log('receive post req');
  console.log(req.body);
  res.json(req.body); // converts to string and sends to client
});

app.listen(3001, console.log("Server listening on port 3001. Try http://localhost:3001/api/post/40"))