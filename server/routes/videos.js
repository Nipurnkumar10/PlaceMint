const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Get all videos with filters
router.get('/', async (req, res) => {
    try {
        const { company, search } = req.query;
        let query = {};
        if (company && company !== 'All') query.company = company;
        if (search) query.title = { $regex: search, $options: 'i' };

        const videos = await Video.find(query).sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a video
router.post('/', async (req, res) => {
    const video = new Video(req.body);
    try {
        const newVideo = await video.save();
        res.status(201).json(newVideo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
