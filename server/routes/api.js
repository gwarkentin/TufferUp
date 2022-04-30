var express = require('express');
const passwords = require('./../.password.js')
var passport = require('passport');

const cors = require('cors');

var mongoose = require("mongoose");
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";
var {Post, Category, Condition, Image} = require('../models/post-model.js');
var { Message, MessageThread } = require('../models/message-model.js')
var User = require('../models/user-model.js')
const { ObjectId, ObjectID } = require('bson');
const { resetTracking } = require('@vue/reactivity');

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
  populate('category condition user', 'category condition name thumbnail rating').
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
          const imgs = post.imgs.map(img => ObjectID(String(img))) //weird that I had to do this. img was a = new ObjectID(':id')
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
      cats.forEach(cat => namedcats[String(cat._id)] = cat );
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
      conds.forEach(cond => namedconds[String(cond._id)] = cond );
      res.json( {conditions: namedconds});
    }
  });
});

router.get('/posts/', (req,res) => {
  // populate(model, fields to get). Fields also includes model._id.  
  // Must specifiy fields on user or you get password and all
  Post.find({}).limit(50)
  .populate('category condition user', 'category condition name thumbnail rating')
  .sort('-createdDate').exec(function(err,posts) {
    console.log(err)
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

router.get('/posts/category/:category', (req,res) => {
  Post.find( { category: req.params.category}).limit(50)
  .populate('category condition user', 'category condition name thumbnail rating')
  .sort('-createdDate').exec( function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
});

router.post('/posts/keywords/', (req,res) => {
  const kws = req.body.keywords
  const kwfilt = { 
    "compound": {
      "should": [
        {
          "autocomplete": {
            "query": kws.join(' '),
            "path": 'title' 
          }
        },
        {
          "autocomplete": {
            "query": kws.join(' '),
            "path": 'description' 
          }
        },
      ],
      "minimumShouldMatch": 1
    }
  }

  Post.aggregate().search(kwfilt).limit(50).then(function(posts) {
    Post.populate(posts, {path: 'user category', select: 'name thumbnail rating category'}, function(err,posts) {
      if (err) {res.json({error:err})}
      else {
        res.json( {posts: posts});
      }
    })
  })
});

router.get('/posts/condition/:condition', (req,res) => {
  Post.find( { condition: req.params.condition}).limit(50)
  .populate('category condition user', 'category condition name thumbnail rating')
  .sort('-createdDate').exec(function(err,posts) {
    if (err) {res.json({error:err})}
    else {
      res.json( {posts: posts});
    }
  });
})

router.get('/posts/user/:userid', (req,res) => {
  Post.find( { user: req.params.userid }).limit(50)
  .populate('category condition user', 'category condition name thumbnail rating')
  .sort('-createdDate').exec(function(err,posts) {
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
    res.json({image: image._id})
  }).catch(err => {
    res.json({error: err})
  });
});

async function addMessage(subscriber, msg_thread, sender) {
  try {
    console.log(subscriber)
    var user = await User.findById((String(subscriber)))
    if (!user) { throw Error("Couldn't find user") }
    var issender = (subscriber === sender)
    if (user.msg_threads) {
      user['msg_threads'].unshift({ thread: msg_thread, unread: !issender })
    }
    else {
      user['msg_threads'] = [{ thread: msg_thread, unread: !issender }]
    }
    await user.save()
    return
  }
  catch (err) {
    console.log(err)
    return err
  }
}

// ah man, didn't realize you could async the cb and therefore use try-catch
router.post('/messaging/send', async (req,res) => {
  console.log('Req sess: ' + req.session)
  try {
    const rb = req.body
    console.log(rb)
    const thread_id = rb.thread_id
    const subscribers = req.body.subscribers

    var msgthread = {} 
    if (thread_id) {
      msgthread = await MessageThread.findById(thread_id).exec();
    }
    else {
      msgthread = await new MessageThread({subscribers: subscribers})
    }
    if (!msgthread) { res.json({error: "Couldn't make/get message thread"})}
    msgthread.msgs.push({
        sender: ObjectID(rb.msg.sender),
        text: String(rb.msg.text),
    })
    const msg_thread = await msgthread.save()
    subscribers.forEach(sub => {
      console.log('sub: ' + sub)
      console.log('sender: ' + rb.msg.sender)
      addMessage(sub, msg_thread, rb.msg.sender) // do not want sync
    })
    res.json({msg_thread: msg_thread})
  }
  catch (err) {
    console.log(err)
    res.json({error: err})
  }
});

//gets entire message thread
router.get('/messaging/get', (req,res) => {
  console.log(req.body)
  MessageThread.findById(String(req.body.thread_id))
    .exec(function(err, msg_thread) {
      if (err) {res.json({error:err})}
      res.json({msg_thread: msg_thread})
  });
});
//gets entire message thread
router.post('/messagethreads/get', (req,res) => {
  console.log(req.body)
  User.findById(String(req.body.user))
    .exec(function(err, user) {
      if (err) {res.json({error:err})}
      res.json({msg_thread: msg_thread})
  });
});


router.get('/user/:id', (req,res) => {
  console.log(req.body)
  User.findById(String(req.params.id), 'msg_threads')
    .exec(function(err, user) {
      if (err) {res.json({error:err})}
      res.json({msg_threads: user.msg_threads})
  });
});

module.exports = router;