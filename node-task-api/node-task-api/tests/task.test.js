// tests/task.test.js
// Integration tests for the Task API using Jest + Supertest.
// Supertest lets us send real HTTP requests to the Express app in-process,
// without needing the server to actually be running on a port.

const request = require('supertest');
const app = require('../app');
const Task = require('../models/Task');

describe('Task API', () => {
  describe('POST /api/tasks', () => {
    it('creates a new task with valid data', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Write resume', priority: 'high' });

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('Write resume');
      expect(res.body.status).toBe('pending'); // default value
      expect(res.body._id).toBeDefined();
    });

    it('rejects a task with no title', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ description: 'Missing a title' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/title/i);
    });
  });

  describe('GET /api/tasks', () => {
    it('returns an empty list when no tasks exist', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBe(0);
      expect(res.body.tasks).toEqual([]);
    });

    it('returns all created tasks', async () => {
      await Task.create({ title: 'Task A' });
      await Task.create({ title: 'Task B' });

      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBe(2);
    });

    it('filters tasks by status', async () => {
      await Task.create({ title: 'Done task', status: 'completed' });
      await Task.create({ title: 'Pending task', status: 'pending' });

      const res = await request(app).get('/api/tasks?status=completed');
      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBe(1);
      expect(res.body.tasks[0].title).toBe('Done task');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('returns a single task by id', async () => {
      const task = await Task.create({ title: 'Find me' });

      const res = await request(app).get(`/api/tasks/${task._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Find me');
    });

    it('returns 404 for a non-existent but valid id', async () => {
      const fakeId = '64a1f0c2e1b1c2d3e4f5a6b7';
      const res = await request(app).get(`/api/tasks/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });

    it('returns 400 for a malformed id', async () => {
      const res = await request(app).get('/api/tasks/not-a-valid-id');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('updates an existing task', async () => {
      const task = await Task.create({ title: 'Old title' });

      const res = await request(app)
        .put(`/api/tasks/${task._id}`)
        .send({ title: 'New title', status: 'in-progress' });

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('New title');
      expect(res.body.status).toBe('in-progress');
    });

    it('returns 404 when updating a task that does not exist', async () => {
      const fakeId = '64a1f0c2e1b1c2d3e4f5a6b7';
      const res = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .send({ title: 'Does not matter' });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('deletes an existing task', async () => {
      const task = await Task.create({ title: 'To be deleted' });

      const res = await request(app).delete(`/api/tasks/${task._id}`);
      expect(res.statusCode).toBe(200);

      const stillThere = await Task.findById(task._id);
      expect(stillThere).toBeNull();
    });

    it('returns 404 when deleting a task that does not exist', async () => {
      const fakeId = '64a1f0c2e1b1c2d3e4f5a6b7';
      const res = await request(app).delete(`/api/tasks/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
