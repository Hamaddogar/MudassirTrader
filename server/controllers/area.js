let router = require("express").Router();
let api = require("../api/area");
let async = require("async");

router.post("/create", (req, res) => {
  api.createArea(req.body, (err, area) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(area);
    }
  });
});
router.post("/upload", (req, res) => {
  let all_promises = [];

  req.body.forEach((area, index) => {
    all_promises.push(function(callback) {
      api.createArea(area, (err, area) => {
        callback(null, area);
        // savedOnes.push(customer);
      });
    });
  });

  async.series(all_promises, function(err, savedarea) {
    res.json(savedarea);
  });
});
router.post("/toggleState", (req, res) => {
  api.toggleArea(req.body, (err, product) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(product);
    }
  });
});
router.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  api.deleteArea(req.params.id, (err, product) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(product);
    }
  });
});

module.exports = router;
