const mongoose = require("mongoose");

module.exports = mongoose.model("User", {
  fullName: String,
 
  password: {
    type: String
  },
  admin:Boolean,
  code: String,

  email: String,
  areas: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Area"
  }],
  phone: String,
  salary: Number,
  status: Boolean
});

