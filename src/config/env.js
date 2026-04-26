import 'dotenv/config';

const getEnvVar = (key, fallback = null) => {
  return process.env[key] || fallback;
};

export const env = {
  port: process.env.PORT || 3000,
  db: {
    host: getEnvVar('DB_HOST', 'localhost'),
    port: getEnvVar('DB_PORT', 27017),
    name: getEnvVar('DB_NAME', 'url-shortener'),
  },
  redis: {
    host: getEnvVar('REDIS_HOST', 'redis_server'),
    port: getEnvVar('REDIS_PORT', 6379),
  },
  jwtSecret: getEnvVar('JWT_SECRET', 'default_secret_key'),
  nodeEnv: getEnvVar('NODE_ENV', 'development'),
};

export const dbUrl = `mongodb://${env.db.host}:${env.db.port}/${env.db.name}`;
