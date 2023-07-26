const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    imageUrls: {
        type: [String],
        require: true
    }
}, { versionKey: false });

const BookModel = model('Book', BookSchema, 'Books');

module.exports = BookModel;

