var mongoose = require('mongoose');
var config = require('./config');
 mongoose.connect("mongodb://guest:tamtamtools123@ds217131.mlab.com:17131/uilaution", { useMongoClient: true })
  
    module.exports = mongoose; 