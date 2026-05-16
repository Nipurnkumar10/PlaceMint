const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    youtubeUrl: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    company: {
        type: String,
        required: true
    },
    role: {
        type: String, // e.g. SDE, Data Analyst
        default: 'SDE'
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    views: {
        type: Number,
        default: 0
    },
    tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
