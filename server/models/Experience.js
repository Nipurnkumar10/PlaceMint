const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    rounds: [{
        roundName: String,
        details: String
    }],
    tips: [String],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    dateOfInterview: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
