let router = require("express").Router();
let api = require("../api/supplier");
// const supplier = require('../db/models/supplier');
let async = require("async");

router.post("/create", (req, res) => {
  //   console.log("Suppler", req.body);
  api.createSupplier(req.body, (err, supplier) => {
    supplier.populate('company', () => {

    if (err) {
      res.status(500).json(err);
    } else {
      console.log(supplier);
      res.json(supplier);
    }

    });
  });
});

router.post("/upload", (req, res) => {
  let all_promises = [];

  req.body.forEach((supplier, index) => {
    all_promises.push(function(callback) {
      api.createSupplier(supplier, (err, supplier) => {
        callback(null, supplier);
        // savedOnes.push(customer);
      });
    });
  });

  async.series(all_promises, function(err, savedSupplier) {
    res.json(savedSupplier);
  });
});

router.delete("/delete:id", (req, res) => {
  // console.log(req.params)
  api.removeSupplier(req.params.id, (err, supplier) => {
    // customer.populate('company area',(err, customer) => {

    if (err) {
      res.status(500).json(err);
    } else {
      res.json(supplier);
    }

    // })
  });
});
module.exports = router;
