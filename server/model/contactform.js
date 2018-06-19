var mongoose = require('../config/mongoose');
//contact schema
var contactformSchema = mongoose.Schema({
    userid:{
        type:String
    },
    organisation: {
        type: String,
    },
    address: {
        type: String
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    website: {
        type: String,
    }
})

var Contactform = mongoose.model('contactform', contactformSchema);

module.exports = Contactform;
