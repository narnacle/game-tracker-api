const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game management
 */

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - category
 *               - difficulty
 *               - hours
 *               - progress
 *               - image
 *             properties:
 *               id:
 *                 type: number
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               hours:
 *                 type: number
 *               progress:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game created successfully
 *       400:
 *         description: Validation error or game ID exists
 */
router.post('/', auth.authenticate, gameController.createGame);

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games for the authenticated user
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of games
 */
router.get('/', auth.authenticate, gameController.getGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a specific game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game data
 *       404:
 *         description: Game not found
 */
router.get('/:id', auth.authenticate, gameController.getGame);

/**
 * @swagger
 * /games/{id}/visibility:
 *   patch:
 *     summary: Toggle game visibility
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isPublic:
 *                 type: boolean
 *             required:
 *               - isPublic
 *     responses:
 *       200:
 *         description: Visibility updated
 *       404:
 *         description: Game not found
 */
router.patch('/:id/visibility', 
  auth.authenticate, 
  gameController.toggleVisibility
);

/**
 * @swagger
 * /games/{id}:
 *   patch:
 *     summary: Update a game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hours:
 *                 type: number
 *               progress:
 *                 type: number
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *     responses:
 *       200:
 *         description: Updated game data
 *       404:
 *         description: Game not found
 */
router.patch('/:id', auth.authenticate, gameController.updateGame);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game deleted
 *       404:
 *         description: Game not found
 */
router.delete('/:id', auth.authenticate, gameController.deleteGame);

module.exports = router;