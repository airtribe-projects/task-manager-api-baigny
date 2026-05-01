const express = require('express');
const app = express();
const port = 3000;
const taskData = require('./task.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = taskData.tasks;
let nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
});

app.post('/tasks', (req, res) => {
    const { title, description, completed } = req.body;
    if (title === undefined || description === undefined || completed === undefined) {
        return res.status(400).json({ error: 'title, description and completed are required' });
    }
    const task = { id: nextId++, title, description, completed };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    const { title, description, completed } = req.body;
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'completed must be a boolean' });
    }
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    res.status(200).json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });
    const deleted = tasks.splice(index, 1)[0];
    res.status(200).json(deleted);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;