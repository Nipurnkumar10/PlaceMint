const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Get all approved experiences
router.get('/', async (req, res) => {
    try {
        const { company } = req.query;
        let query = { status: 'approved' };
        if (company) query.company = company;

        const experiences = await Experience.find(query).sort({ createdAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get ALL experiences (Admin only)
router.get('/all', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update experience status (Admin only)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Experience.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an experience (Admin only)
router.delete('/:id', async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Submit a new experience
router.post('/', async (req, res) => {
    const experience = new Experience(req.body);
    try {
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
