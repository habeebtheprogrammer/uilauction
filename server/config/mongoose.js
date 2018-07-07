var mongoose = require('mongoose');
var config = require('./config');
// mongoose.connect("mongodb://tamtamtools:olamide@ds119080.mlab.com:19080/tamtamtools", { useMongoClient: true })
 mongoose.connect("mongodb://guest:tamtamtools123@ds217131.mlab.com:17131/uilaution", { useMongoClient: true })
    // process.env.PORT ? mongoose.connect("mongodb://guest:tamtamtools123@ds217131.mlab.com:17131/uilaution", { useMongoClient: true })
    //     : mongoose.connect(config.dbURL, { useMongoClient: true });
   
    module.exports = mongoose; 