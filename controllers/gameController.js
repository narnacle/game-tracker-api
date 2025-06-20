const Game = require('../models/Game');
const { gameValidation } = require('../utils/validation');

exports.createGame = async (req, res) => {
  try {
    const { error } = gameValidation.create.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const game = new Game({ ...req.body, user: req.user._id });
    await game.save();
    
    res.status(201).send(game);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({ error: 'Game with this ID already exists' });
    }
    res.status(500).send({ error: 'Failed to create game' });
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