const mongoose = require('mongoose')

var bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
    },
    author: {
        type: String,
    },
    year: {
        type: Number,
    },
    language: {
        type: String,
    }
});

mongoose.model("Book", bookSchema);