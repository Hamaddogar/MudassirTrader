const Sale = require("../db/models/sale");
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
    return Sale.find(args)
      .populate("area  customer product")
      .exec(cb);
  },
  createSale(data, cb) {
    if (data._id) {
      Sale.findById(data._id, (err, sale) => {
        sale.bills.pop();
        data.bills.pop();
        sale.bills.forEach(dbbill => {
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

                        remainQty = product.productQty + +oneCartonUntis;

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

                        remainQty = product.productQty - oneCartonUntis;

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
              } else {
                if (bill.product.quantityType == "unit") {
                  Product.findById(bill.product._id, (err, product) => {
                    if (dbbill.units > bill.units) {
                      let newUnits = dbbill.units - bill.units;
                      product.productQty = product.productQty + +newUnits;
                    }
                    if (dbbill.units < bill.units) {
                      let newUnits = bill.units - dbbill.units;
                      product.productQty = product.productQty - +newUnits;
                    }

                    Product.findByIdAndUpdate(bill.product._id, product, {
                      new: true
                    }).exec();
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
                            product.productQty + oneCartonUntis;
                        }
                        if (dbbill.crtn < bill.crtn) {
                          let newCrtn = bill.crtn - dbbill.crtn;
                          let oneCartonUntis = +product.cartonSize * +newCrtn;

                          product.productQty =
                            product.productQty - oneCartonUntis;
                        }

                        if (bill.units > 0) {
                          if (dbbill.units > bill.units) {
                            let newUnits = dbbill.units - bill.units;
                            product.productQty = product.productQty + +newUnits;
                          }
                          if (dbbill.units < bill.units) {
                            let newUnits = bill.units - dbbill.units;
                            product.productQty = product.productQty - +newUnits;
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
                    if (bill.crtn > 0 || bill.units > 0) {
                      let remainQty = 0;

                      if (bill.crtn > 0) {
                        let oneCartonUntis = +product.cartonSize * +bill.crtn;
                        product.productQty =
                          product.productQty - oneCartonUntis;
                      }
                      if (bill.units > 0) {
                        product.productQty = product.productQty - +bill.units;
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
      Sale.findByIdAndUpdate(data._id, data, { new: true }).exec();
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
      let newSale = new Sale(data);
      // data.lastUpdated = new Date();
      newSale.save(cb);
    }
  },
  deleteSale(id, cb) {
    return Sale.findOneAndDelete(id, cb);
  }
};
