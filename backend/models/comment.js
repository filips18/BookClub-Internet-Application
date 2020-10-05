const mongoose = require("mongoose");
const Book = require("./book");

const commentSchema = mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    body:{
        type: String
    },
    book: {
        type: Book.schema,
        required: true
    },
    stars:{
        type: Number,
        min: 0,
        max: 10,
        required: true
    }
});

const Comment = module.exports = mongoose.model('Comment', commentSchema);