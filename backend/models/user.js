const mongoose = require("mongoose");
const Book = require("./book");
//const Book = mongoose.model("Book", bookSchema);
const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    profilePicture:{
        type : String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required : true
    },
    approved:{
        type: Boolean,
        required: true
    },
    lastLoggedIn:{
        type: Date,
        required: true
    },
    readBooks:{
        type: [Book.schema],
        required: true
    },
    booksBeingRead:{
        type: [{
            book : Book.schema,
            pages: Number,
            pageOn: Number
        }],
        required: true
    },
    booksToRead:{
        type: [Book.schema],
        required: true
    },
    following:{
        type: [String],
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);