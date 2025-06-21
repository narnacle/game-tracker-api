const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
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
router.get('/games/:userId', limiter, publicController.getPublicGames);

module.exports = router;