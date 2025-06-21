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
    trim: true,          // Added string trimming
    maxlength: 100       // Added max length
  },
  category: {
    type: String,
    trim: true           // Added for consistency
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true       // Made required
  },
  hours: {
    type: Number,
    min: 0,              // Added minimum value
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
    validate: {          // Added URL validation
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
  toJSON: { virtuals: true },  // Include virtuals when converted to JSON
  toObject: { virtuals: true } // Include virtuals when converted to objects
});

// Add indexes (place AFTER schema definition)
gameSchema.index({ id: 1 });               // Single field index
gameSchema.index({ user: 1, id: 1 });      // Compound index

// Add virtual property (place AFTER schema definition)
gameSchema.virtual('isCompleted').get(function() {
  return this.progress === 100;
});

// Add query helpers (optional)
gameSchema.query.byUser = function(userId) {
  return this.where({ user: userId });
};

module.exports = mongoose.model('Game', gameSchema);