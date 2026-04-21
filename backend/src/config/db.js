import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB() {
  const mongoUri = env.mongoUri;

  // Guard: catch localhost fallback slipping through in production
  if (env.nodeEnv === 'production' && mongoUri.includes('127.0.0.1')) {
    console.error('❌ FATAL: MONGO_URI is pointing to localhost in production. Check Render env vars.');
    process.exit(1);
  }

  mongoose.set('strictQuery', true);

  try {
    // Let the URI define the DB name — don't override with a broken split()
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}
