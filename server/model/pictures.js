var mongoose = require('../config/mongoose');

var picturesSchema = mongoose.Schema({
    userID: String,
    imgUrl: String,
    imgID:String,    
    description:String,
    date: String,
    caption:String

});

var pictures = mongoose.model('pictures', picturesSchema);
module.exports = pictures;

