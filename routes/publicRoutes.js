const express = require('express');
const router = express.Router();
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
    const games = await Game.find({
      user: req.params.userId,
      isPublic: true
    }).select('id title progress difficulty hours createdAt -_id');

    if (!games.length) {
      return res.status(404).send({ 
        error: "No public games found or user doesn't exist" 
      });
    }

    res.send(games.map(game => ({
      ...game.toObject(),
      isCompleted: game.progress === 100,
      image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/header.jpg`
    })));
  } catch (err) {
    console.error("Public endpoint error:", err);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;