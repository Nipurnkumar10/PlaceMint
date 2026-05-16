const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    solvedQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    aptitudeScores: [{
        category: String,
        score: Number,
        total: Number,
        date: { type: Date, default: Date.now }
    }],
    streaks: {
        current: { type: Number, default: 0 },
        lastActivity: { type: Date }
    },
    xp: { type: Number, default: 0 },
    badges: [String],
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
