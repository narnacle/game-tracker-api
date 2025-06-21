const Game = require('../models/Game');
const { gameValidation } = require('../utils/validation');

exports.createGame = async (req, res) => {
  try {
    const gameData = {
      ...req.body,
      user: req.user._id,
      _id: undefined // Explicitly prevent _id
    };

    const game = new Game(gameData);
    await game.save();
    
    res.status(201).send(game);
  } catch (err) {
    console.error('Creation error:', err);
    
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Duplicate game ID',
        message: `Game with ID ${req.body.id} already exists`
      });
    }
    
    res.status(500).json({
      error: 'Creation failed',
      details: err.message,
      receivedData: req.body // For debugging
    });
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find({ user: req.user._id });
    res.send(games);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch games' });
  }
};

exports.getGame = async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id, user: req.user._id });
    if (!game) return res.status(404).send({ error: 'Game not found' });
    res.send(game);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch game' });
  }
};

exports.toggleVisibility = async (req, res) => {
  try {
    const game = await Game.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isPublic: req.body.isPublic },
      { new: true }
    );
    
    if (!game) return res.status(404).send();
    res.send({ isPublic: game.isPublic });
  } catch (err) {
    res.status(500).send({ error: "Failed to update visibility" });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const { error } = gameValidation.update.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const game = await Game.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!game) return res.status(404).send({ error: 'Game not found' });
    res.send(game);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update game' });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!game) return res.status(404).send({ error: 'Game not found' });
    res.send(game);
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete game' });
  }
};