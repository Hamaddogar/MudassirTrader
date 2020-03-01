let router = require('express').Router();
let api = require('../api/company'); 
let async = require("async");

router.post('/create', (req, res)=>{

    api.createCompany(req.body,(err, company)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(company);
        }

    });

});
router.post("/upload", (req, res) => {
    let all_promises = [];
  
    req.body.forEach((company, index) => {
      all_promises.push(function(callback) {
        api.createCompany(company, (err, company) => {
          callback(null, company);
          // savedOnes.push(customer);
        });
      });
    });
  
    async.series(all_promises, function(err, savedarea) {
      res.json(savedarea);
    });
  });
  router.delete("/delete/:id", (req, res) => {
    console.log(req.params)
    api.removeCompany(req.params.id, (err, company) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(company);
      }
    });
  });
router.get('/all', (req, res)=>{

    api.get(req.body,(err, company)=>{
        
        if(err){
            res.status(500).json(err);
        }else{
            res.json(company);
        }

    });

})


module.exports = router;