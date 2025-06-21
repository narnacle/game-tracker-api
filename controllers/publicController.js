const Game = require('../models/Game');

exports.getPublicGames = async (req, res) => {
  try {
    const games = await Game.find({
      user: req.params.userId,
      isPublic: true
    }).select('title progress difficulty isCompleted');
    
    games.length 
      ? res.send(games)
      : res.status(404).send({ error: "No public games found" });
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
};