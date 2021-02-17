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
    senderName:{
        type: String,
    },
    senderBatch:{
        type: String
    },
    senderBranch:{
        type: String
    },
    senderCollege:{
        type: String
    },
    time:{
        type: Date
    }
});

const comments = mongoose.model('comments', comSchema);
module.exports = comments;