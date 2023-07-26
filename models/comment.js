const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    comments: {
        type: [],
        require: true
    },
}, { versionKey: false });

const CommentModel = model('Comment', CommentSchema, 'Comments');

module.exports = CommentModel;