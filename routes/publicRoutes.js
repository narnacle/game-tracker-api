const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const publicController = require('../controllers/publicController');

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: "Too many requests, please try again later" }
});

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
router.get('/games/:userId', publicLimiter, publicController.getPublicGames);

module.exports = router;