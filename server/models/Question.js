const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    category: {
        type: String,
        enum: ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'DP', 'Recursion', 'Sorting', 'Other'],
        required: true
    },
    problemLink: {
        type: String
    },
    companyTags: [String],
    solution: {
        type: String
    },
    videoUrl: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
