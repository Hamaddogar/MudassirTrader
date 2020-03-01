let router = require("express").Router();
let api = require("../api/customer");
let async = require("async");


router.post("/upload", (req, res) => {
  req.body.pop()
  console.log(req.body)
  let all_promises = [];
  req.body.forEach((oldcustomer, index) => {
    all_promises.push(function(callback) {
      api.createCustomer(oldcustomer, (err, customer) => {
        customer.populate("area",  (err, newcustomer) => {
          callback(null, newcustomer);
          // savedOnes.push(customer);
        });
      });
    });
  });

  async.series(all_promises, function(err, savedCustomers) {
    res.json(savedCustomers);
  });
});

router.post("/create", (req, res) => {

  api.createCustomer(req.body, (err, customer) => {
    customer.populate("area ", async (err, customer) => {  //company removed
      if (err) {
        res.send(err);
      } else {
        res.json(customer);
      }
      // savedOnes.push(customer);
    });
  });
});

router.delete("/deleteCustomer:id", (req, res) => {
  // console.log(req.params)
  api.removeCustomer(req.params.id, (err, customer) => {
    // customer.populate('company area',(err, customer) => {

    if (err) {
      res.status(500).json(err);
    } else {
      res.json(customer);
    }

    // })
  });
});

module.exports = router;
