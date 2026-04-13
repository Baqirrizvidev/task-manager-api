const express = require('express');
const app = express();

app.use(express.json());

// In-memory store 
let taskList = [];
let idCounter = 1;

// --- Task Routes ---

// Get all tasks (with bonus filters) [cite: 8, 14]
app.get('/tasks', (req, res) => {
    let tasks = [...taskList];
    const { status, sort } = req.query;

    // Filter by status 
    if (status) {
        tasks = tasks.filter(t => t.status === status);
    }

    // Sort by creation time 
    if (sort === 'createdAt') {
        tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    res.json(tasks);
});

// Create a task [cite: 8]
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    // Validation: Title is required 
    if (!title) {
        return res.status(400).json({ message: "Missing required field: title" });
    }

    const newTask = {
        id: idCounter++,
        title: title,
        description: description || "",
        status: "pending", // Default status 
        createdAt: new Date().toISOString()
    };

    taskList.push(newTask);
    res.status(201).json(newTask);
});

// Get task by ID [cite: 8]
app.get('/tasks/:id', (req, res) => {
    const task = taskList.find(t => t.id === parseInt(req.params.id));
    
    if (!task) {
        return res.status(404).json({ message: "No task found with that ID" }); [cite: 12]
    }
    
    res.json(task);
});

// Update title/description [cite: 8]
app.put('/tasks/:id', (req, res) => {
    const task = taskList.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { title, description } = req.body;
    
    // We only update if fields are actually provided
    if (title) task.title = title;
    if (description !== undefined) task.description = description;

    res.json(task);
});

// Mark task as done [cite: 8]
app.patch('/tasks/:id/done', (req, res) => {
    const task = taskList.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = "done";
    res.json(task);
});

// Delete a task [cite: 8]
app.delete('/tasks/:id', (req, res) => {
    const index = taskList.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ message: "Can't delete: Task doesn't exist" });
    }

    taskList.splice(index, 1);
    res.status(200).json({ message: "Successfully removed task" });
});

// --- Bonus: Error Handling & 405s  ---

app.all('/tasks', (req, res) => {
    res.status(405).json({ message: `Method ${req.method} not allowed on this route.` });
});

app.all('/tasks/:id', (req, res) => {
    res.status(405).json({ message: `Method ${req.method} not allowed here.` });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});