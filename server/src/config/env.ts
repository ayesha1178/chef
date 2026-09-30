import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/vanta_club',
  JWT_SECRET: process.env.JWT_SECRET || 'vanta-editorial-club-secret-key-2026',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@vanta.club',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'vanta2026',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
