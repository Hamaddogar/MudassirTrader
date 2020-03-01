const Product = require("../db/models/product");

module.exports = {
  api_getAll(args) {
    var args = args || {};

    return new Promise((c, e) => {
      this.get(args, function(err, products) {
        if (err) {
          e(err);
        } else {
          c(products);
        }
      });
    });
  },
  get(args, cb) {
    return Product.find(args)
      .populate("company category supplier")
      .exec(cb);
  },
  createProduct(data, cb) {
    if (data._id) {
      Product.findByIdAndUpdate(data._id, data, { new: true })
        .populate("company category supplier")
        .exec(cb);
    } else {
      let newProduct = new Product(data);
      newProduct.save(cb);
    }

    // let newProduct = new Product(data);
    // newProduct.save(cb)
  },
  removeProduct(id, cb) {
    return Product.findByIdAndRemove(id, cb);
  },
  toggleProduct(id, cb) {
    return Product.findByIdAndUpdate(id, cb);
  }
};
