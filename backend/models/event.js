const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    description:{
        type: String,
        required: true
    },
    public:{
        type: Boolean,
        required: true
    },
    madeByUser:{
        type: String,
        required: true
    },
    participants:{
        type: [String],
        required: true
    },
    requests:{
        type: [String],
        required: true
    },
    activities:{
        type: [String],
        required: true
    },
    closed: {
        type: Boolean,
        required: true
    }
});

const Event = module.exports = mongoose.model('Event', eventSchema);