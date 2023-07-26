const DB_CONNECTION = require('./connection');
const { default: mongoose } = require("mongoose");

const connection = async () => {
    console.log('init connection to DB')
    try {
        await mongoose.connect(DB_CONNECTION);
        await console.log('connected to DB');
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    connection
}