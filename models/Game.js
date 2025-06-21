const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  category: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  hours: {
    type: Number,
    min: 0,
    required: true
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  image: {
    type: String,
    default: function() {
      return `https://cdn.cloudflare.steamstatic.com/steam/apps/${this.id}/header.jpg`;
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  // Critical configuration
  _id: false,             // Disable automatic _id
  timestamps: true,       // Add createdAt/updatedAt
  versionKey: false       // Disable __v field
});

// Virtual property
gameSchema.virtual('isCompleted').get(function() {
  return this.progress === 100;
});

module.exports = mongoose.model('Game', gameSchema);