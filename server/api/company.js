const Company = require("../db/models/company");
const Supplier = require("../db/models/supplier");
const Product = require("../db/models/product");


module.exports = {
  api_getAll(args) {
    var args = args || {};

    return new Promise((c, e) => {
      this.get(args, function(err, companies) {
        if (err) {
          e(err);
        } else {
          console.log(c(companies));
          c(companies);
        }
      });
    });
  },
  createCompany(data, cb) {
    if (data._id) {
      Company.findByIdAndUpdate(data._id, data, { new: true }).exec(cb);
    } else {
      let newCompany = new Company(data);
      newCompany.save(cb);
    }
  },
  get(args, cb) {
    return Company.find(args)
      .populate("company")
      .exec(cb);
  },
  removeCompany(id, cb) {
    // Supplier.find({ company: id },(err,suppliers)=>{
    //   if(suppliers.length > 1){
        Supplier.deleteMany({ company: id },(err,re)=>{
          // console.log(re)
        });
    //   }else{
    //     Supplier.deleteOne({ company: id });
    //   }
    // });
    Product.deleteMany({ company: id },(err,re)=>{
      // console.log(re)
    });
    return Company.findByIdAndRemove(id, cb);
  },
  toggleCompany(args, cb) {
    return Company.findByIdAndUpdate(args._id, args, cb);
  }
};
