const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Game = require('../models/Game');
const mongoose = require('mongoose');

describe('Game API', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/game-tracker-test');
    
    // Create a test user and get token
    await User.deleteMany();
    await Game.deleteMany();

    const user = await request(app)
      .post('/auth/register')
      .send({
        username: 'gametestuser',
        email: 'gametest@example.com',
        password: 'password123'
      });

    authToken = user.body.token;
    userId = user.body.user._id;
  }, 10000);

  afterAll(async () => {
    await User.deleteMany();
    await Game.deleteMany();
    await mongoose.connection.close();
  }, 10000);

  describe('POST /games', () => {
    it('should create a new game', async () => {
      const res = await request(app)
        .post('/games')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          id: 620,
          title: 'Portal 2',
          category: 'action adventure',
          difficulty: 'medium',
          hours: 25,
          progress: 99,
          image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe('Portal 2');
    });
  });

  describe('GET /games', () => {
    it('should get all games for user', async () => {
      const res = await request(app)
        .get('/games')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
});