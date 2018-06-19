var mongoose = require('../config/mongoose');
//contact schema
var contactartistSchema = mongoose.Schema({
    senderid: {
        type: String
    },
    receiverid: {
        type: String
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
    },
    message: {
        type: String,
    }
})

var Contactartist = mongoose.model('contactartist', contactartistSchema);

module.exports = Contactartist;
