const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    titlePicture:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    authors:{
        type : [String],
        required: true
    },
    dateOfPublishing:{
        type: Date,
        required: true
    },
    genres:{
        type: [String],
        maxlength: 3,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    },
    averageScore: {
        type: Number,
        required: true
    }
});

const Book = module.exports = mongoose.model('Book', bookSchema);