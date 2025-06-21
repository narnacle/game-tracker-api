const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Game = require('../models/Game');

/**
 * @swagger
 * /public/games/{userId}:
 *   get:
 *     summary: Get public games for a user
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of public games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PublicGame'
 */
// Remove rate limiting temporarily for testing
router.get('/games/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).send({ error: "Invalid user ID" });
    }

    const games = await Game.find({
      user: req.params.userId,
      isPublic: true
    }).lean(); // .lean() for better performance

    res.send(games.map(game => ({
      id: game.id,
      title: game.title,
      progress: game.progress,
      difficulty: game.difficulty,
      isCompleted: game.progress === 100
    })));
  } catch (err) {
    console.error("Public endpoint error:", err);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;