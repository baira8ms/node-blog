var mongoose = require('mongoose');

module.exports = mongoose.model('Blog', {
    text: {
        type: String,
        default: ''
    }
});