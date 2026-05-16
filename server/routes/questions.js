const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        let query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        const questions = await Question.find(query);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a question (Admin only later)
router.post('/', async (req, res) => {
    const question = new Question(req.body);
    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
