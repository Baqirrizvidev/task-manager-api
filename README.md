# 📋 Personal Task Manager API

This is a lightweight REST API for managing tasks, built with **Node.js** and **Express**. It uses in-memory storage, meaning no external database is required.

---

## 🚀 Setup & Execution

1. **Install Dependencies** Open your terminal in the project folder and run:
   ```bash
   npm install
Start the Server 
Run the following command to launch the API:npm start
The server will be active at: http://localhost:3000 
Method  Endpoint        Description
POST    /tasks          Create a new task (starts as 'pending').
GET     /tasks          Get all tasks. Supports ?status and ?sort.+1
GET     /tasks/:id      Get a specific task by its unique ID.
PUT     /tasks/:id      Update a task's title or description.
PATCH   /tasks/:id/done Mark a task as completed.
DELETE  /tasks/:id      Permanently remove a task.

 Usage Examples (curl)
1. Create a Task
Bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title": "Submit Assignment", "description": "Ensure the README is professional"}'
2. Filtering & Sorting (Bonus Features)By Status: curl http://localhost:3000/tasks?status=pendingBy Creation: curl http://localhost:3000/tasks?sort=createdAt
3. Mark as Done
Bash
curl -X PATCH http://localhost:3000/tasks/1/done
4. Delete a Task
Bash
curl -X DELETE http://localhost:3000/tasks/1
🛠️ Data Model
Each task contains the following fields:
id: Auto-generated unique number.
title: String (Required).
description: String (Optional).
status: pending or done.
createdAt: ISO 8601 timestamp.
 Validation & Errors
400 Bad Request: Returned if the required title is missing.
404 Not Found: Returned if the task ID does not exist.
405 Method Not Allowed: Returned for unsupported methods on valid routes.
