const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const { userValidation } = require('../utils/validation');

exports.register = async (req, res) => {
  try {
    const { error } = userValidation.register.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { username, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send({ error: 'User already exists' });

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(500).send({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = userValidation.login.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    
    res.send({ user, token });
  } catch (err) {
    res.status(500).send({ error: 'Login failed' });
  }
};