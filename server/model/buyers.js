var mongoose = require('../config/mongoose');
//user schema
var buyerSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
   
    price: {
        type: Number,
        default: false
    },
    bid:{
        type: Number,
        default: 0
    },
    delivered: {
        type: Boolean,
        default: false
    },
    paymentId: {
        type: String
    },
   
    city: {
        type: String,
    },
    state: {
        type: String,
    },
   productID:{
       type:String
   },
    email: {
        type: String,
        trim: true,
    },
    date: {
        type: String
    },
    shipping: {
        type: String
    },
    billing: {
        type: String
    },
   
    organisation: {
        type: String
    },
    phone:{
        type: String
    }
})
buyerSchema.index({ firstName: 'text', lastName: 'text', location: "text", selectedIndustry: "text" });
var Buyer = mongoose.model('buyer', buyerSchema);

module.exports = Buyer;
