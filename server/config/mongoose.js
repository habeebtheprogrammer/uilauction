var mongoose = require('mongoose');
var config = require('./config');
// mongoose.connect("mongodb://127.0.0.1:27017/uilaution", { useMongoClient: true }, (suc)=>console.log("connected"))

 mongoose.connect("mongodb://guest:tamtamtools123@ds217131.mlab.com:17131/uilaution", { useMongoClient: true })
  
    module.exports = mongoose; 