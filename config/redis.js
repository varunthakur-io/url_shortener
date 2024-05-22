const redis = require("redis");

// Create a Redis client
const redisClient = redis.createClient({
  url: "redis://localhost:6379", // Redis server URL
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