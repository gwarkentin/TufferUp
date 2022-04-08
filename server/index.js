
const express = require('express');
var session = require('express-session');
const path = require('path');
var logger = require('morgan');
const passwords = require('./.password.js')

const bodyParser = require('body-parser');
const cors = require('cors');


var passport = require('passport');

var MongoDBStore = require('connect-mongodb-session')(session);
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";
var store = new MongoDBStore({
    uri: uri,
    collection: 'sessions'
  }, function(error) {
  // didn't connect to db
});
store.on('error', function(error) {
  console.log(error);
});

const app = express();

app.use(session({
  secret: passwords.sessionkey,
  resave: false,
  saveUninitialized: false,
  store: store 
}));
app.use(passport.authenticate('session'));

app.use(bodyParser.json()); //read json input from requests
app.use(express.urlencoded({ extended: true })); // read web form input
app.use(cors());

//just for now for login/signup page
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// import routes
var authRouter = require('./routes/auth');
app.use('/', authRouter);

var apiRouter = require('./routes/api');
app.use('/api', apiRouter);


app.get('/', (req, res) => {
  res.send(JSON.stringify(req.session) + " is logged in")

});

app.listen(3001, console.log("Server listening on port 3001. Try http://localhost:3001/api/category/Books"));