var mongoose = require('../config/mongoose');

var video = mongoose.Schema({
    userID: String,
    videoUrl: String,
    title: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    dpUrl: {
        type: String
    },
    dpID: String,
    industry: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    youtubelink:{
        type: String
    }
});

var videos = mongoose.model('videos', video);
module.exports = videos;

