const { Category } = require('../models/post-model')
const router = require('./api')

router.get('/condition/addall', (req,res) => {
  ['New','Excellent','Good','Fair','Poor','Broken/Damaged'].forEach(cond=>{
    const newcond = new Condition({condition: cond});
    newcond.save();
  });
  res.json({msg:'sure'})
});

router.post('/category/add/', (req,res) => {
  const newcategory = new Category({category: req.data })
  newcategory.save().then(newcat=>
    res.json({msg:'New Cat: ' + newcat})
  ).catch(err => {
    res.json({error: err})
  });
});