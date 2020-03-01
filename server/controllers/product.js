let router = require("express").Router();
let api = require("../api/product");
let async = require("async");

router.post("/create", (req, res) => {
  api.createProduct(req.body, (err, product) => {
    product.populate("company category supplier", (err, product) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(product);
      }
    });
  });
});
router.post("/upload", (req, res) => {
  let all_promises = [];

  req.body.forEach((product, index) => {
    all_promises.push(function(callback) {
      api.createProduct(product, (err, product) => {
        product.populate("company category supplier ", async (err, product) => {
          callback(null, product);
          // savedOnes.push(customer);
        });
      });
    });
  });

  async.series(all_promises, function(err, savedproduct) {
    res.json(savedproduct);
  });
});
router.post("/toggleState", (req, res) => {
  api.createProduct(req.body, (err, product) => {
    product.populate("company category supplier", (err, product) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(product);
      }
    });
  });
});
router.post("/load", (req, res) => {
  let all_promises = [];

  req.body.forEach((productId, index) => {
    all_promises.push(function(callback) {
      api.toggleProduct(productId, (err, product) => {
        // product.populate("company category supplier ", async (err, product) => {
        callback(null, product);
        // savedOnes.push(customer);
        // });
      });
    });
  });

  async.series(all_promises, function(err, savedproduct) {
    res.json(savedproduct);
  });
});
router.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  api.removeProduct(req.params.id, (err, product) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(product);
    }
  });
});
module.exports = router;
