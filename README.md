# 🎮 Game Tracker API

A RESTful API for tracking game progress with authentication, built with Node.js, Express, and MongoDB.

## Features

- ✅ JWT Authentication
- 🛡️ Secure endpoints with rate limiting
- 📊 MongoDB database integration
- 📝 Swagger documentation
- 🧪 Jest testing suite
- 📦 Ready for deployment

## Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm/yarn

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/game-tracker-api.git
   cd game-tracker-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/game-tracker?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_key
   JWT_EXPIRES_IN=1d
   ```

### Running Locally
```bash
npm run dev
```
API will be available at `http://localhost:3000`

## API Documentation
Interactive Swagger docs available at:
- `http://localhost:3000/api-docs` (local)
- `https://your-deployed-url/api-docs` (production)

## Endpoints
| Method | Endpoint       | Description            | Auth Required |
|--------|---------------|------------------------|---------------|
| POST   | /auth/register| Register new user      | No            |
| POST   | /auth/login   | Login user             | No            |
| POST   | /games        | Create new game entry  | Yes           |
| GET    | /games        | Get all games          | Yes           |
| GET    | /games/:id    | Get single game        | Yes           |
| PATCH  | /games/:id    | Update game            | Yes           |
| DELETE | /games/:id    | Delete game            | Yes           |

## Testing
Run the test suite:
```bash
npm test
```

## Deployment
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

Free deployment options:
- Render.com
- Railway.app
- Cyclic.sh

## Environment Variables
See `.env.example` for required variables.

## Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License.

## Contact
Narnacle Digital - [@NRPerfectsIT]([https://twitter.com/yourtwitter](https://x.com/NRPerfectsIt)) - contact@narnacle.com
