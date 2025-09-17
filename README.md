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

- [Node.js](https://nodejs.org/) (v16 or later)
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

```
DATABASE_URL=<your-database-url>
PORT=<your-port>
JWT_SECRET=<your-jwt-secret>
REDIS_URL=<your-redis-url>
```

Make sure to replace `<your-database-url>`, `<your-port>`, `<your-jwt-secret>`, and `<your-redis-url>` with your actual values.

### 4. Start the Application

Run the following command to start the application:

```bash
npm start
```

Visit `http://localhost:<your-port>` in your browser to access the app.

## Docker Setup

If you prefer to run the app with Docker, follow these steps:

### 1. Build and Start the Services Using Docker Compose

```bash
docker-compose up --build
```

### 2. Access the Application

Once the containers are up and running, visit `http://localhost:3000` to access the app.

## Usage

### Shorten a URL

1. Open the app at `http://localhost:<your-port>`.
2. Enter a long URL in the input field and click the "Shorten" button.
3. Copy the generated short URL and share it.

### Track Analytics

- You can view analytics for each shortened URL by navigating to `/analytics/:shortURL`.

## Project Structure

```
url_shortener/
├── controllers/            # Application logic for handling requests
├── models/                 # Mongoose schemas for MongoDB
├── routes/                 # Express route definitions
├── views/                  # EJS templates for rendering HTML
├── middlewares/            # Custom middleware functions
├── config/                 # Configuration files (e.g., Redis, MongoDB)
├── public/                 # Static assets (e.g., CSS, JS, images)
├── .env.example            # Example environment variables
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Dockerfile for building the app container
├── app.js                  # Main application entry point
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

### Analytics Routes

- `GET /analytics/:shortURL`: Get analytics (click count and visit history) for a specific URL.

## Development

### Running in Development Mode

For a better development experience, use `nodemon` to automatically reload the application upon file changes:

```bash
npm run dev
```

### Linting

Ensure your code follows best practices using ESLint:

```bash
npm run lint
```

### Running Tests

To run tests (if applicable), use:

```bash
npm test
```

## Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bugfix.
3. **Make your changes**, commit them, and push the branch.
4. **Open a pull request** with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Bootstrap](https://getbootstrap.com/)
