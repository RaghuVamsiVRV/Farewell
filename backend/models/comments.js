const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create blogs Schema & model
const comSchema = new Schema({
    comment: {
        type: String,
        requied: true
    },
    to: {
        type: String,
        requied: true
    },
    from:{
        type: String,
        requied: true
    },
    time:{
        type: Date
    }
});

const comments = mongoose.model('comments', comSchema);
module.exports = comments;