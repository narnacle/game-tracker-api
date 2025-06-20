require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/game-tracker',
  jwtSecret: process.env.JWT_SECRET || 'ctiVt6ZuuxvyGO49xyIMjpdwYLcii8xs',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};