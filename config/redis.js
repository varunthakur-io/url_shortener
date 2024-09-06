const redis = require("redis");

// Create a Redis client
// const redisClient = redis.createClient({
//   url: "redis://localhost:6379", // Redis server URL
// });

// Use the Redis service name from Docker Compose instead of localhost
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});



redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => console.error("Redis connection error:", err));

// Check for Redis connection errors
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redisClient;