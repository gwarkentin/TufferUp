
router.get('/condition/addall', (req,res) => {
  ['New','Excellent','Good','Fair','Poor','Broken/Damaged'].forEach(cond=>{
    const newcond = new Condition({condition: cond})
    newcond.save()
  })
  res.json({msg:'sure'})
})