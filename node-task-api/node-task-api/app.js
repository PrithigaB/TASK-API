// app.js
// Creates and configures the Express app, but does NOT start the server or
// connect to the database. Kept separate from server.js so tests can import
// the app directly (via supertest) without spinning up a real network port.

const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json()); // parses incoming JSON request bodies (req.body)

// Health check endpoint — useful for confirming the API is up
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
