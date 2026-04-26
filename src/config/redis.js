import redis from 'redis';
import { env } from './env.js';

const redisClient = redis.createClient({
  url: `redis://${env.redis.host}:${env.redis.port}`,
});

if (env.nodeEnv !== 'test') {
  redisClient
    .connect()
    .then(() => console.log('Connected to Redis'))
    .catch((err) => console.error('Redis connection error:', err));
}

redisClient.on('error', (err) => {
  if (env.nodeEnv !== 'test') {
    console.error('Redis error:', err);
  }
});

export default redisClient;
