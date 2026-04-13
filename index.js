const express = require('express');
const app = express();

app.use(express.json());

// In-memory store
let taskList = [];
let idCounter = 1;

// --- Task Routes ---

// Get all tasks (with bonus filters)
app.get('/tasks', (req, res) => {
    let tasks = [...taskList];
    const { status, sort } = req.query;

    if (status) {
        tasks = tasks.filter(t => t.status === status);
    }

    if (sort === 'createdAt') {
        tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    res.json(tasks);
});

// Create a task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Missing required field: title" });
    }

    const newTask = {
        id: idCounter++,
        title: title,
        description: description || "",
        status: "pending",
        createdAt: new Date().toISOString()
    };

    taskList.push(newTask);
    res.status(201).json(newTask);
});

// Get task by ID
app.get('/tasks/:id', (req, res) => {
    const task = taskList.find(t => t.id === parseInt(req.params.id));
    
    if (!task) {
        return res.status(404).json({ message: "No task found with that ID" });
    }
    
    res.json(task);
});

// Update title/description
app.put('/tasks/:id', (req, res) => {
    const task = taskList.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { title, description } = req.body;
    
    if (title) task.title = title;
    if (description !== undefined) task.description = description;

    res.json(task);
});

// Mark task as done
app.patch('/tasks/:id/done', (req, res) => {
    const task = taskList.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = "done";
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const index = taskList.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ message: "Can't delete: Task doesn't exist" });
    }

    taskList.splice(index, 1);
    res.status(200).json({ message: "Successfully removed task" });
});

// Bonus: Handle 405 Method Not Allowed
app.all('/tasks', (req, res) => {
    res.status(405).json({ message: `Method ${req.method} not allowed on this route.` });
});

app.all('/tasks/:id', (req, res) => {
    res.status(405).json({ message: `Method ${req.method} not allowed here.` });
});
// Root route so the home page isn't empty
app.get('/', (req, res) => {
    res.send('<h1>Task Manager API is running!</h1><p>Go to <a href="/tasks">/tasks</a> to see your data.</p>');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});