const Game = require('../models/Game');

exports.getPublicGames = async (req, res) => {
  try {
    const games = await Game.find({
      user: req.params.userId,
      isPublic: true
    }).select('appId title progress difficulty isCompleted -_id');
    
    res.send(games);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch public games" });
  }
};