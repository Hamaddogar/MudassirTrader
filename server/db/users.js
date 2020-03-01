// // let mongoose = require("mongoose");

// // mongoose.connect('mongodb+srv://hammad:hammad@cluster0-mxrsp.mongodb.net/test?retryWrites=true&w=majority'),{ useNewUrlParser: true , useCreateIndex:true},function(err,data){


// let userSchema = mongoose.Schema({
//   username:{
//       type:String,
//       require: true,
//       unique:true
//   },
//   email: {
//     type: String,
//     require: true
//   },
//   number: {
//     type: Number,
//     require: true
//   },
//   password: {
//     type: String,
//     require: true
//   },
//   admin:false
// });

// let User = mongoose.model("user", userSchema);

// let u1 = new User();
// u1.email = "mudassirtrdrs@gmail.com";
// u1.number = "1";
// u1.password = "12345";
//  u1.admin=true;

// u1.save();

// module.exports = User;
