let router = require('express').Router();
let api = require('../api/category'); 
let async = require("async");

router.post('/create', (req, res)=>{

    api.createCategory(req.body,(err, category)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(category);
        }

    });

})
router.delete("/delete/:id", (req, res) => {
    console.log(req.params)
    api.removeCategory(req.params.id, (err, category) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(category);
      }
    });
  });
  router.post("/upload", (req, res) => {
    let all_promises = [];
  
    req.body.forEach((category, index) => {
      all_promises.push(function(callback) {
        api.createCategory(category, (err, category) => {
          callback(null, category);
          // savedOnes.push(customer);
        });
      });
    });
  
    async.series(all_promises, function(err, savedarea) {
      res.json(savedarea);
    });
  });
router.post('/toggleState', (req, res)=>{

    api.toggleCategory(req.body,(err, category)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(category);
        }

    });

})


module.exports = router;