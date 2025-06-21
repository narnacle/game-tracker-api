const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true  // This creates the index - remove gameSchema.index({id:1})
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  category: {
    type: String,
    trim: true
  },
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
    },
    validate: {
      validator: v => /^https?:\/\/.+\..+/.test(v),
      message: props => `${props.value} is not a valid URL!`
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// REMOVED the duplicate: gameSchema.index({ id: 1 });

// Keep compound index (not duplicate)
gameSchema.index({ user: 1, id: 1 });

// Virtual property
gameSchema.virtual('isCompleted').get(function() {
  return this.progress === 100;
});

// Query helper
gameSchema.query.byUser = function(userId) {
  return this.where({ user: userId });
};

module.exports = mongoose.model('Game', gameSchema);