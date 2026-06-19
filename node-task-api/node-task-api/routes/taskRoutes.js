// routes/taskRoutes.js
// Maps HTTP verbs + URLs to controller functions.
// This is the Express equivalent of Django's urls.py.

const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.get('/', getTasks);          // GET    /api/tasks
router.get('/:id', getTaskById);    // GET    /api/tasks/:id
router.post('/', createTask);       // POST   /api/tasks
router.put('/:id', updateTask);     // PUT    /api/tasks/:id
router.delete('/:id', deleteTask);  // DELETE /api/tasks/:id

module.exports = router;
