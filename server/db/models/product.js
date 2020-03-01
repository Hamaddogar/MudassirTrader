const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",

  {
    cartonSize: Number,
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category"
    },
    code: String,
    company: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Company"
    },
    supplier: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Supplier"
    },
    cost: Number,
    customerPrice: Number,
    description: String,
    margin: Number,
    name: String,
    productQty: Number,
    quantityType: String,
    shopkeeperPrice: Number,
    status: Boolean,
    costArray: Array,
    shopkeeperArray: Array,
    customerArray: Array
    // discountedAmt:Number,
    // net:0
  }
);

module.exports = Product;
