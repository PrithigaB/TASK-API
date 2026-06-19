# Task API — Node.js + Express + MongoDB

A small REST API for managing tasks, built with Express and MongoDB (via Mongoose),
with a full Jest + Supertest test suite.

This project exists to give you **real, run-it-yourself experience** with:
- Node.js / Express (server-side JavaScript)
- MongoDB / Mongoose (NoSQL database)
- Test-Driven Development (Jest + Supertest)

---

## 1. Setup

### Prerequisites
- Node.js installed (you confirmed you have this)
- A MongoDB connection — **easiest option: free MongoDB Atlas cluster** (no local install needed)
  - Go to https://www.mongodb.com/cloud/atlas/register, create a free (M0) cluster
  - Click "Connect" → "Drivers" → copy the connection string
  - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskdb`

### Install dependencies
```bash
cd node-task-api
npm install
```

### Configure environment
Create a `.env` file in the project root:
```
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.xxxxx.mongodb.net/taskdb
PORT=5000
```

### Run the server
```bash
npm start
```
You should see:
```
MongoDB connected: cluster0-shard-...
Task API running on http://localhost:5000
```

### Run the tests
```bash
npm test
```
This uses an **in-memory MongoDB** (via `mongodb-memory-server`), so tests don't
need your real Atlas connection — they're fully self-contained and safe to run anytime.

---

## 2. Try the API (with Postman or curl)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/api/tasks` | — | List all tasks (supports `?status=pending`) |
| GET | `/api/tasks/:id` | — | Get one task |
| POST | `/api/tasks` | `{ "title": "Buy milk" }` | Create a task |
| PUT | `/api/tasks/:id` | `{ "status": "completed" }` | Update a task |
| DELETE | `/api/tasks/:id` | — | Delete a task |

Example with curl:
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "priority": "high"}'
```

---

## 3. Project structure (and why it's organized this way)

```
node-task-api/
├── server.js              # Entry point: connects DB, starts server
├── app.js                 # Express app config (no DB/server startup — testable in isolation)
├── config/db.js           # MongoDB connection logic
├── models/Task.js         # Mongoose schema (like a Django model, but for MongoDB)
├── controllers/           # Business logic for each route
│   └── taskController.js
├── routes/                # URL → controller mapping (like Django's urls.py)
│   └── taskRoutes.js
└── tests/
    ├── setup.js            # Spins up in-memory MongoDB before tests run
    └── task.test.js        # Jest + Supertest tests for all CRUD endpoints
```

This separation (routes / controllers / models) is the standard Express pattern —
the same separation-of-concerns idea as Django's urls.py / views.py / models.py,
which is a good thing to mention if asked to compare the two stacks in an interview.

---

## 4. What this demonstrates — and how to talk about it honestly

If asked about this in an interview, here's accurate language to use:

> "I built a small Express and MongoDB REST API to get hands-on with the Node
> ecosystem, since my main background is Django. It has full CRUD, schema
> validation with Mongoose, and a Jest test suite using Supertest and an
> in-memory MongoDB so the tests are isolated and repeatable."

**Be ready for natural follow-ups:**
- *"Why Mongoose instead of the raw MongoDB driver?"* → Mongoose adds schema
  validation and a more structured model layer, similar to what Django's ORM
  gives you over raw SQL.
- *"What does `runValidators: true` do on update?"* → By default, Mongoose
  only runs schema validation on `create`, not `findByIdAndUpdate`. This flag
  forces validation to run on updates too.
- *"Why an in-memory MongoDB for tests?"* → Tests stay fast, isolated, and
  don't require a real database connection or risk polluting real data.
- *"What's the difference between this and your Django REST Framework work?"*
  → DRF gives you serializers, viewsets, and built-in auth out of the box;
  Express is more minimal/unopinionated, so you wire up validation, routing,
  and structure yourself. Both end up doing the same job — JSON in, JSON out
  over HTTP — through different philosophies.

**Don't overclaim:** this is one small project, not production experience.
"Hands-on practice with Node and MongoDB through a personal project" is accurate.
"Experienced Node developer" is not — keep the resume framing honest, as before.
