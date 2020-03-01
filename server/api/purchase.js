const Purchase = require("../db/models/purchases");
const Product = require("../db/models/product");

module.exports = {
  api_getAll(args) {
    var args = args || {};

    return new Promise((c, e) => {
      this.get(args, function(err, sales) {
        if (err) {
          e(err);
        } else {
          c(sales);
        }
      });
    });
  },
  get(args, cb) {
    return Purchase.find(args)
      .populate("supplier")
      .exec(cb);
  },
  createPurchase(data, cb) {
    if (data._id) {
      Purchase.findById(data._id, (err, purchase) => {
        purchase.bills.pop();
        data.bills.pop();
        purchase.bills.forEach(dbbill => {
          data.bills.forEach(bill => {
            if (dbbill.product._id == bill.product._id) {
              // if (dbbill.crtn == bill.crtn && dbbill.units == bill.units)
              //   return;
              // if (bill.deleted && dbbill.deleted) {
              //   return;
              // }
              if (bill.deleted && !dbbill.deleted) {
                if (bill.product.quantityType == "unit") {
                  Product.findById(bill.product._id, (err, product) => {
                    product.productQty = product.productQty - +bill.units;
                    Product.findByIdAndUpdate(bill.product._id, product, {
                      new: true
                    }).exec();
                  });
                }
                //
                if (bill.product.quantityType == "carton") {
                  Product.findById(bill.product._id, (err, product) => {
                    if (product.productQty > 0) {
                      if (bill.crtn > 0) {
                        let remainQty;

                        let oneCartonUntis = +product.cartonSize * +bill.crtn;

                        remainQty = product.productQty - +oneCartonUntis;

                        if (bill.units > 0) {
                          product.productQty = +remainQty - +bill.units;
                        } else {
                          product.productQty = remainQty;
                        }

                        Product.findByIdAndUpdate(bill.product._id, product, {
                          new: true
                        }).exec((err, updatedProduct) => {
                          console.log(updatedProduct);
                        });
                      }
                    }
                  });
                }
                //
              } else if (!bill.deleted && dbbill.deleted) {
                if (bill.product.quantityType == "unit") {
                  Product.findById(bill.product._id, (err, product) => {
                    product.productQty = product.productQty + +bill.units;
                    Product.findByIdAndUpdate(bill.product._id, product, {
                      new: true
                    }).exec();
                  });
                }
                //
                if (bill.product.quantityType == "carton") {
                  Product.findById(bill.product._id, (err, product) => {
                    if (product.productQty > 0) {
                      if (bill.crtn > 0) {
                        let remainQty;

                        let oneCartonUntis = +product.cartonSize * +bill.crtn;

                        remainQty = product.productQty + oneCartonUntis;

                        if (bill.units > 0) {
                          product.productQty = +remainQty + +bill.units;
                        } else {
                          product.productQty = remainQty;
                        }

                        Product.findByIdAndUpdate(bill.product._id, product, {
                          new: true
                        }).exec((err, updatedProduct) => {
                          console.log(updatedProduct);
                        });
                      }
                    }
                  });
                }
                //
              } else {
                if (bill.product.quantityType == "unit") {
                  Product.findById(bill.product._id, (err, product) => {
                    if (dbbill.units > bill.units) {
                      let newUnits = dbbill.units - bill.units;
                      product.productQty = product.productQty - +newUnits;
                    }
                    if (dbbill.units < bill.units) {
                      let newUnits = bill.units - dbbill.units;
                      product.productQty = product.productQty + +newUnits;
                    }

                    Product.findByIdAndUpdate(bill.product._id, product, {
                      new: true
                    }).exec((err, updatedProduct) => {
                      console.log(updatedProduct);
                    });
                  });
                }
                //
                if (bill.product.quantityType == "carton") {
                  Product.findById(bill.product._id, (err, product) => {
                    if (product.productQty > 0) {
                      if (bill.crtn > 0 || bill.units) {
                        if (dbbill.crtn > bill.crtn) {
                          let newCrtn = dbbill.crtn - bill.crtn;
                          let oneCartonUntis = +product.cartonSize * +newCrtn;

                          product.productQty =
                            product.productQty - oneCartonUntis;
                        }
                        if (dbbill.crtn < bill.crtn) {
                          let newCrtn = bill.crtn - dbbill.crtn;
                          let oneCartonUntis = +product.cartonSize * +newCrtn;

                          product.productQty =
                            product.productQty + oneCartonUntis;
                        }

                        if (bill.units > 0) {
                          if (dbbill.units > bill.units) {
                            let newUnits = dbbill.units - bill.units;
                            product.productQty = product.productQty - +newUnits;
                          }
                          if (dbbill.units < bill.units) {
                            let newUnits = bill.units - dbbill.units;
                            product.productQty = product.productQty + +newUnits;
                          }
                        }

                        Product.findByIdAndUpdate(bill.product._id, product, {
                          new: true
                        }).exec((err, updatedProduct) => {
                          console.log(updatedProduct);
                        });
                      } else {
                        product.productQty = product.productQty - +bill.units;
                        console.log(product);

                        Product.findByIdAndUpdate(bill.product._id, product, {
                          new: true
                        }).exec((err, updatedProduct) => {
                          console.log(updatedProduct);
                        });
                      }
                    }
                  });
                }
              }
            } else {
              // if (dbbill.crtn == bill.crtn && dbbill.units == bill.units) return;
              if (bill.product.quantityType == "unit") {
                Product.findById(bill.product._id, (err, product) => {
                  product.productQty = product.productQty + +bill.units;
                });
                Product.findByIdAndUpdate(bill.product._id, product, {
                  new: true
                }).exec();
              }
              //
              if (bill.product.quantityType == "carton") {
                Product.findById(bill.product._id, (err, product) => {
                  if (product.productQty > 0) {
                    if (bill.crtn > 0 || bill.units > 0) {
                    

                      if (bill.crtn > 0) {
                        let oneCartonUntis = +product.cartonSize * +bill.crtn;
                        product.productQty =
                          product.productQty + oneCartonUntis;
                      }
                      if (bill.units > 0) {
                        product.productQty = product.productQty + +bill.units;
                      }
                      Product.findByIdAndUpdate(bill.product._id, product, {
                        new: true
                      }).exec((err, updatedProduct) => {
                        console.log(updatedProduct);
                      });
                    }
                  }
                });
              }
              //
            }
          });
        });
      });
      Purchase.findByIdAndUpdate(data._id, data, { new: true }).exec();
    } else {
      data.bills.forEach(bill => {
        if (bill.product.quantityType == "unit") {
          Product.findById(bill.product._id, (err, product) => {
            if (product.productQty > 0) {
              product.productQty = product.productQty - +bill.units;

              Product.findByIdAndUpdate(bill.product._id, product, {
                new: true
              }).exec();
            }
          });
        }
        if (bill.product.quantityType == "carton") {
          Product.findById(bill.product._id, (err, product) => {
            if (product.productQty > 0) {
              if (bill.crtn > 0) {
                let oneCartonUntis = +product.cartonSize * +bill.crtn;

                let remainQty = product.productQty - oneCartonUntis;
                if (bill.units > 0) {
                  product.productQty = remainQty - +bill.units;
                } else {
                  product.productQty = remainQty;
                }

                Product.findByIdAndUpdate(bill.product._id, product, {
                  new: true
                }).exec((err, updatedProduct) => {
                  console.log(updatedProduct);
                });
              } else {
                product.productQty = product.productQty - +bill.units;
                console.log(product);

                Product.findByIdAndUpdate(bill.product._id, product, {
                  new: true
                }).exec((err, updatedProduct) => {
                  console.log(updatedProduct);
                });
              }
            }
          });
        }
      });
      // data.bills.forEach(bill => {
      //   return (bill.product = bill.product._id);
      // });
      let newPurchase = new Purchase(data);
      // data.lastUpdated = new Date();
      newPurchase.save(cb);
    }
    // data.lastUpdated = new Date();
  },
  deletePuchase(id, cb) {
    return Purchase.findOneAndRemove(id, cb);
  }
};
