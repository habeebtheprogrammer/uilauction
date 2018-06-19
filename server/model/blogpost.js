var mongoose = require('../config/mongoose');

var blogpostSchema = mongoose.Schema({
    imgUrl: String,
    imgID: String,
    title: {
        type: String
    },
    category: {
        type: String
    },
    youtubelink: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }
});
blogpostSchema.index({ title: 'text' });

var Blogpost = mongoose.model('blogpost', blogpostSchema);
module.exports = Blogpost;

