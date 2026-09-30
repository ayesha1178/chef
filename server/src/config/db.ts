import mongoose from 'mongoose';
import { ENV } from './env.js';

let isMongoConnected = false;

export async function connectDatabase(): Promise<boolean> {
  try {
    // Attempt connection with a short timeout so server starts immediately without hanging
    const options: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    };
    
    await mongoose.connect(ENV.MONGODB_URI, options);
    isMongoConnected = true;
    console.log(`[VANTA DB] Connected successfully to MongoDB at ${ENV.MONGODB_URI}`);
    return true;
  } catch (error: any) {
    isMongoConnected = false;
    console.warn(`[VANTA DB] MongoDB not available (${error.message}).`);
    console.log(`[VANTA DB] Falling back automatically to high-performance local JSON-file persistence engine at server/data/db.json.`);
    return false;
  }
}

export function getIsMongoConnected(): boolean {
  return isMongoConnected;
}
