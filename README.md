# 📋 Personal Task Manager API

A clean, lightweight REST API for managing tasks, built with **Node.js** and **Express**. This project uses in-memory storage for fast execution and handles common edge cases with clear error messaging.

---

## 🚀 Setup & Execution

**1. Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) installed.
**2. Installation:** Open your terminal in the project folder and run:
```bash
npm install && npm start

The API will be live at: http://localhost:3000

Method,Endpoint,Description
POST,/tasks,Create a new task (starts as pending).
GET,/tasks,Retrieve all tasks (supports filter & sort).
GET,/tasks/:id,Get a specific task by its unique ID.
PUT,/tasks/:id,Update a task's title or description.
PATCH,/tasks/:id/done,Mark a task as completed.
DELETE,/tasks/:id,Permanently remove a task.


Usage Examples (curl)
Create a Task

curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title": "Submit Assignment", "description": "Ensure the README is professional"}'


Filtering & Sorting (Bonus)
By Status: curl http://localhost:3000/tasks?status=pending

By Creation Date: curl http://localhost:3000/tasks?sort=createdAt

Mark as Done
Bash
curl -X PATCH http://localhost:3000/tasks/1/done
 Data Model
id: Auto-generated unique number.

title: String (Required).

description: String (Optional).

status: pending or done.

createdAt: ISO 8601 timestamp.

 Error Handling
400 Bad Request: Missing or invalid fields (e.g., empty title).

404 Not Found: Task ID does not exist.

405 Method Not Allowed: Unsupported method on a valid route.
