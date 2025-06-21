require('dotenv').config();
const Joi = require('joi');

// Define validation schema
const envSchema = Joi.object({
  // MongoDB
  MONGO_URI: Joi.string()
    .uri({ scheme: ['mongodb', 'mongodb+srv'] })
    .required()
    .description('MongoDB connection string'),
    
  // JWT  
  JWT_SECRET: Joi.string()
    .min(32)
    .required()
    .description('JWT secret key'),
    
  JWT_EXPIRES_IN: Joi.string()
    .default('1d')
    .description('JWT expiration time')
}).unknown(); // Allows other env vars

// Validate
const { value: envVars, error } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  mongoURI: envVars.MONGO_URI,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN
};