// config/db.js
// Handles connecting to MongoDB using Mongoose.
// In production this points to a real MongoDB Atlas / local MongoDB URI.
// In tests, we override MONGO_URI with an in-memory MongoDB instance (see tests/setup.js).

const mongoose = require('mongoose');

async function connectDB(uri) {
  const connectionString = uri || process.env.MONGO_URI;

  if (!connectionString) {
    throw new Error('MONGO_URI is not defined. Set it in your .env file.');
  }

  try {
    await mongoose.connect(connectionString);
    console.log('MongoDB connected:', mongoose.connection.host);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
