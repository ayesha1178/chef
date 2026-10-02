import dotenv from 'dotenv';
import path from 'path';

dotenv.config();const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/vanta_club',
  JWT_SECRET: requireEnv('JWT_SECRET') || 'dev-secret-key-do-not-use-in-prod',
  ADMIN_EMAIL: requireEnv('ADMIN_EMAIL') || 'admin@example.com',
  ADMIN_PASSWORD: requireEnv('ADMIN_PASSWORD') || 'changeme',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
