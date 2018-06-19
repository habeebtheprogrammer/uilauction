var mongoose = require('../config/mongoose');
//user schema
var userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
    },
    paid: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    paymentId: {
        type: String
    },
    industryKey: {
        type: String
    },
    membership: {
        type: String
    },
    selectedIndustry: {
        type: String,
    },
    selectedCategory: {
        type: String,
    },
    gender: {
        type: String,
    },
    desc: {
        type: String
    },
    street: {
        type: String
    },
    bio: {
        type: String,
        default: 'Hey there! i am new to bidders'
    },
     registration: {
        type: Boolean,
        default: false
    },
    workExp: {
        type: String,
    },
    dpUrl: {
        type: String
    },
    dpID: String,
    bgID: String,
    bgUrl: {
        type: String
    },
    email: {
        type: String,
        trim: true,
    },
    date: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    style: {
        type: String
    },
    studies: {
        type: String
    },
    instrument: {
        type: String
    },
    nationality: {
        type: String
    },
    vatno: {
        type: Number
    },
    exp: {
        type: String
    },
    bop: {
        type: String
    },
    dob: {
        type: String
    },
    teaching: {
        type: Boolean
    },
    views: {
        type: Number,
        default: 0
    },
    username: {
        type: String,
    },
    city:  {
        type: String
    },
    state: {
        type: String
    },
    company: {
        type: Boolean,
        default:false
    },
    phone:{
        type: String
    }
})
userSchema.index({ firstName: 'text', lastName: 'text', country: "text", selectedIndustry: "text" });
var User = mongoose.model('users', userSchema);

module.exports = User;
