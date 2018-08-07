var mongoose = require('../config/mongoose');

var productSchema = mongoose.Schema({
    userID: String,
    imgUrl: String,
    imgID:String,
    title: {
        type: String
    },
    price: {
        type: Number
    },
    nprice: {
        type: Number
    },
    mprice: {
        type: Number
    },
    description: {
        type: String
    },
    billing: {
        type: String
    },
    sfee: {
        type: Number,
        default: 0
    },
    sfee2: {
        type: Number,
        default: 0
    },
    sdescription: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number
    },
    stock: {
        type: Number,
        default: 1
    },
     duration: {
        type: Number,
          default: 86400000
    },
    email: {
        type: String
    },
    date: {
        type: String
    },
    dpUrl: {
        type: String
    },
    industry: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }
});
productSchema.index({ title: 'text', industry: 'text', price: 'text' });

var Product = mongoose.model('product', productSchema);
module.exports = Product;

