# URL Shortener

A web application that allows users to shorten URLs, track analytics, and manage user profiles. Built with Node.js, Express, MongoDB, Redis, and EJS.

## Features

- **User Authentication**: Sign up, log in, and log out functionality.
- **URL Shortening**: Generate short URLs for long links.
- **Analytics**: Track the number of clicks and visit history for each shortened URL.
- **User Profiles**: Manage user details and upload profile pictures.
- **Caching**: Redis is used to cache URL data for improved performance.
- **Responsive Design**: Built with Bootstrap for a mobile-friendly experience.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or later)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- Docker (optional, for containerized deployment)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/varunthakur-io/url_shortener.git
cd url_shortener
```

### 2. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=url-shortener
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_secret_key
```

### 4. Start the Application

Run the following command to start the application:

```bash
npm start
```

Visit `http://localhost:3000` in your browser to access the app.

## Docker Setup

The project is fully containerized. You can start the entire stack (App, Mongo, Redis) with one command:

### 1. Build and Start the Services

```bash
docker-compose up --build
```

### 2. Access the Application

Once the containers are up and running, visit `http://localhost:3000` to access the app.

## Project Structure

```text
url_shortener/
├── public/                 # Static assets (CSS, JS, images)
├── src/                    # Source code
│   ├── config/             # Centralized configuration (Env, DB, Redis)
│   ├── controllers/        # Application logic
│   ├── middlewares/        # Custom middleware (Auth, Multer)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express route definitions
│   ├── services/           # Utility services (JWT)
│   ├── views/              # EJS templates
│   └── app.js              # Application entry point
├── .env.example            # Example environment variables
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Dockerfile for app container
└── package.json            # Project metadata and dependencies
```

## API Endpoints

### User Routes

- `POST /user/signup`: Register a new user.
- `POST /user/login`: Log in a user.
- `GET /user/logout`: Log out the current user.
- `POST /user/profile`: Update user profile.

### URL Routes

- `POST /url/shorten`: Shorten a URL.
- `GET /url/:shortURL`: Redirect to the original URL.
- `DELETE /url/:id`: Delete a shortened URL.

## Development

### Running in Development Mode

Uses `nodemon` to automatically reload upon file changes:

```bash
npm run dev
```

### Linting & Formatting

```bash
npm run lint       # Check for code issues
npm run lint:fix   # Automatically fix issues
npm run format     # Format code with Prettier
```

## License

This project is licensed under the MIT License.
