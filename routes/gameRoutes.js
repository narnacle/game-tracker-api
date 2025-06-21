const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - difficulty
 *         - hours
 *         - progress
 *       properties:
 *         id:
 *           type: integer
 *           example: 990080
 *         title:
 *           type: string
 *           maxLength: 100
 *           example: "Hogwarts Legacy"
 *         category:
 *           type: string
 *           example: "action adventure rpg"
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, hard]
 *           example: "easy"
 *         hours:
 *           type: number
 *           minimum: 0
 *           example: 30
 *         progress:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           example: 33
 *         image:
 *           type: string
 *           format: uri
 *           readOnly: true
 *           example: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg"
 *         isCompleted:
 *           type: boolean
 *           readOnly: true
 *           description: Auto-computed from progress
 *         user:
 *           type: string
 *           format: objectId
 *           readOnly: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *     PublicGame:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *         progress:
 *           type: number
 *         difficulty:
 *           type: string
 *         isCompleted:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game management
 */

/**
 * @swagger
 * /users/{userId}/games:
 *   get:
 *     summary: Get public game data for any user
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Public game data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PublicGame'
 */

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game (image URL auto-generated)
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
 *               - difficulty
 *               - hours
 *               - progress
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 990080
 *               title:
 *                 type: string
 *                 example: "Hogwarts Legacy"
 *               category:
 *                 type: string
 *                 example: "action adventure rpg"
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *                 example: "easy"
 *               hours:
 *                 type: number
 *                 example: 30
 *               progress:
 *                 type: number
 *                 example: 33
 *     responses:
 *       201:
 *         description: Game created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Validation error
 */
router.post('/', auth.authenticate, gameController.createGame);

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games with computed fields
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of games with auto-generated fields
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get('/', auth.authenticate, gameController.getGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game with computed fields
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         required: true
 *     responses:
 *       200:
 *         description: Game data with auto-computed fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
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