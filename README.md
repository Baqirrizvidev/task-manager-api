# Task Manager API

A simple REST API for managing personal tasks. Built with **Node.js** (zero dependencies — uses only built-in modules).

---

## How to Run

```bash
# 1. Clone / download the project folder
cd task-manager

# 2. No install needed — zero dependencies!
#    (But if you want to follow the assignment spec exactly:)
npm install   # nothing to install, just verifies package.json is valid

# 3. Start the server
npm start
```

The server starts on **http://localhost:3000**

To use a different port:
```bash
PORT=4000 npm start
```

---

## Endpoints

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | /tasks               | Create a new task                    |
| GET    | /tasks               | Get all tasks                        |
| GET    | /tasks/:id           | Get a single task by ID              |
| PUT    | /tasks/:id           | Update a task's title or description |
| PATCH  | /tasks/:id/done      | Mark a task as completed             |
| DELETE | /tasks/:id           | Delete a task                        |

Each task has: `id`, `title`, `description`, `status` (`pending` / `done`), `createdAt`

---

## Example Requests (curl)

### Create a task — POST /tasks
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```
**Response (201):**
```json
{
  "id": "a1b2c3d4-...",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2026-04-13T10:00:00.000Z"
}
```

---

### Get all tasks — GET /tasks
```bash
curl http://localhost:3000/tasks
```

**Filter by status (bonus):**
```bash
curl "http://localhost:3000/tasks?status=pending"
curl "http://localhost:3000/tasks?status=done"
```

**Sort by creation time (bonus):**
```bash
curl "http://localhost:3000/tasks?sort=createdAt"
```

---

### Get a single task — GET /tasks/:id
```bash
curl http://localhost:3000/tasks/a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
**If not found (404):**
```json
{ "error": "Task with id 'a1b2c3d4-...' not found." }
```

---

### Update a task — PUT /tasks/:id
```bash
curl -X PUT http://localhost:3000/tasks/a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries and snacks", "description": "Milk, eggs, bread, chips"}'
```
> You can update just `title`, just `description`, or both.

---

### Mark as done — PATCH /tasks/:id/done
```bash
curl -X PATCH http://localhost:3000/tasks/a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx/done
```
**Response (200):** task with `"status": "done"`

---

### Delete a task — DELETE /tasks/:id
```bash
curl -X DELETE http://localhost:3000/tasks/a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
**Response (200):**
```json
{ "message": "Task 'a1b2c3d4-...' deleted successfully." }
```

---

## Error Handling

| Scenario                        | HTTP Status | Example response                                   |
|---------------------------------|-------------|-----------------------------------------------------|
| Missing `title` on create       | 400         | `{ "error": "Field 'title' is required..." }`      |
| Invalid JSON body               | 400         | `{ "error": "Invalid JSON body" }`                 |
| Task ID doesn't exist           | 404         | `{ "error": "Task with id '...' not found." }`    |
| Route not found                 | 404         | `{ "error": "Route not found." }`                 |
| Wrong HTTP method on valid route| 405         | `{ "error": "Method 'POST' not allowed on ..." }` |

---

## Project Structure

```
task-manager/
├── index.js       # All server logic (router + handlers)
├── package.json   # npm start → node index.js
└── README.md
```

> **Note:** All data is stored in memory. Restarting the server clears all tasks.
