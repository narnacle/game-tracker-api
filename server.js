const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config/config');

// Simple logger if not available from app
const logger = console;

mongoose.connect(config.mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Atlas connection error:', err);
    process.exit(1);
  });

// Error handling for ongoing connections
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});