var mongoose = require('mongoose');
var config = require('./config');
// mongoose.connect("mongodb://tamtamtools:olamide@ds119080.mlab.com:19080/tamtamtools", { useMongoClient: true })
//  mongoose.connect("mongodb://guest:guest@ds037215.mlab.com:37215/kaystore", { useMongoClient: true })
    process.env.PORT ? mongoose.connect("mongodb://guest:guest@ds037215.mlab.com:37215/kamal", { useMongoClient: true })
        : mongoose.connect(config.dbURL, { useMongoClient: true });
   
    module.exports = mongoose; 