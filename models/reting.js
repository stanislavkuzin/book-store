const { Schema, model } = require('mongoose');

const RetingSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    arrReting: {
        type: [Number],
        require: true
    },
}, { versionKey: false });

const RetingModel = model('Reting', RetingSchema, 'Retings');

module.exports = RetingModel;