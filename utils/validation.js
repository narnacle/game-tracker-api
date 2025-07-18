const Joi = require('joi');

const userValidation = {
  register: Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

const gameValidation = {
  create: Joi.object({
    appId: Joi.number().required(),
    title: Joi.string().required(),
    category: Joi.string().required(),
    difficulty: Joi.string().valid('easy', 'medium', 'hard').required(),
    hours: Joi.number().min(0).required(),
    progress: Joi.number().min(0).max(100).required()
  }),
  update: Joi.object({
    hours: Joi.number().min(0),
    progress: Joi.number().min(0).max(100),
    difficulty: Joi.string().valid('easy', 'medium', 'hard')
  })
};

module.exports = { userValidation, gameValidation };