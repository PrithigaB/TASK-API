// server.js
// Entry point for running the API for real (not in tests).
// Loads environment variables, connects to MongoDB, then starts listening.

require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Task API running on http://localhost:${PORT}`);
  });
}

start();
