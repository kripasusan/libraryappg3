const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.gewcx.mongodb.net/LibraryApp?sretryWrites=true&w=majority');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    image: String

});

var BookData = mongoose.model('bookData', BookSchema);

module.exports = BookData;
