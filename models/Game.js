const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  appId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  hours: {
    type: Number,
    required: true,
    min: 0
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  image: {
    type: String,
    default: function() {
      return `https://cdn.cloudflare.steamstatic.com/steam/apps/${this.appId}/header.jpg`;
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true // Or false depending on your preference
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual property
gameSchema.virtual('isCompleted').get(function() {
  return this.progress === 100;
});

module.exports = mongoose.model('Game', gameSchema);