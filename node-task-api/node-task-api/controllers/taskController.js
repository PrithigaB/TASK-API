// controllers/taskController.js
// Business logic for each route lives here, separate from routing (routes/taskRoutes.js)
// and the Express app setup (server.js). This separation mirrors Django's
// urls.py -> views.py -> models.py pattern, just with Express + Mongoose instead.

const Task = require('../models/Task');

// GET /api/tasks
// Supports optional ?status=pending filtering, similar to DRF's filter backends.
async function getTasks(req, res) {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ count: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/tasks/:id
async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    // CastError happens when :id isn't a valid MongoDB ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }
    res.status(500).json({ error: err.message });
  }
}

// POST /api/tasks
async function createTask(req, res) {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/tasks/:id
async function updateTask(req, res) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document, not the original
      runValidators: true, // re-run schema validation on update
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/tasks/:id
async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted', id: req.params.id });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
