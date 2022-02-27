const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// middleware
app.use(bodyParser.json());
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
        "imgs": ["/src/assets/palms_and_snow.jpg"]
    }
    }
  );
});

app.listen(3001, console.log("Server listening on port 3001. Try http://localhost:3001/api/post/40"))

// test