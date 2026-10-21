# Task Management API (Node.js + Express + MongoDB) 📋⚡

A decoupled, asynchronous RESTful API engineered using **Node.js, Express.js, and MongoDB**, featuring full Test-Driven Development (TDD) coverage using Jest and Supertest.

## 🚀 Key Features & Architectural Highlights
- **Decoupled Architecture:** Organized using an industry-standard MVC pattern separating routing paths (`routes/`), data blueprints (`models/`), and core logic handling (`controllers/`).
- **NoSQL Database Integration:** Implemented structured schema validation and data mapping layer via **Mongoose ORM** connected to a MongoDB Atlas cluster.
- **Test-Driven Development (TDD):** Maintained an isolated and automated testing pipeline leveraging **Jest & Supertest** executing against a self-contained, in-memory MongoDB environment (`mongodb-memory-server`).
- **Asynchronous Pipeline:** Leveraged modern JavaScript `async/await` patterns to ensure non-blocking HTTP request processing.

## 🛠️ Tech Stack & Tools
- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js
- **Database Architecture:** MongoDB & Mongoose ORM
- **Testing Suite:** Jest, Supertest, mongodb-memory-server
- **API Tooling:** Postman, curl

## 📂 Core API Endpoints Documented
- `GET /node-task-api/api/tasks` - List all tasks asynchronously (supports filter parameters: `?status=pending`)
- `GET /node-task-api/api/tasks/:id` - Fetch an isolated task by specific unique document ID
- `POST /node-task-api/api/tasks` - Handle, validate, and create a brand-new JSON task payload
- `PUT /node-task-api/api/tasks/:id` - Modify active target states using forced schema validation updates
- `DELETE /node-task-api/api/tasks/:id` - Execute resource purging safely out of the operational data layer

## 💻 Local Installation & Testing Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd TASK-API/node-task-api
   ```

2. **Install local ecosystem packages:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

4. **Boot up the server:**
   ```bash
   npm start
   ```

5. **Run automated test suites:**
   ```bash
   npm test
   ```
