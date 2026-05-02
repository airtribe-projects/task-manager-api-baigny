# Task Manager API

A RESTful API built with Node.js and Express for managing tasks in memory.

## Setup

```bash
npm install express
npm install
node app.js
```

Server runs on `http://localhost:3000`

---
## API Endpoints

### GET /tasks
Retrieve all tasks. Supports optional filtering and sorting by creation order.

**Query params:**
- `?completed=true` — returns only completed tasks
- `?completed=false` — returns only incomplete tasks

**Response:** `200`
```json
[
  { "id": 1, "title": "Task", "description": "Desc", "completed": false, "priority": "low" }
]
```

---

### GET /tasks/:id
Retrieve a single task by ID.

**Response:** `200` task object / `404` if not found

---

### POST /tasks
Create a new task.

**Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "completed": false,
  "priority": "medium"
}
```

- `title`, `description`, `completed` are required
- `priority` is optional (`low` / `medium` / `high`), defaults to `low`

**Response:** `201` created task / `400` validation errors

---

### PUT /tasks/:id
Update an existing task. All fields are optional.

**Body:**
```json
{
  "title": "Updated Title",
  "completed": true,
  "priority": "high"
}
```

**Response:** `200` updated task / `404` if not found / `400` validation errors

---

### DELETE /tasks/:id
Delete a task by ID.

**Response:** `200` deleted task / `404` if not found

---

### GET /tasks/priority/:level
Retrieve all tasks by priority level (`low`, `medium`, `high`).

**Response:** `200` array of tasks / `400` if level is invalid

---

## Testing with Postman

Postman collection: [Task Manager API Collection](https://universal-sunset-220568.postman.co/workspace/Exploring-APIs~4290d2d8-ca86-4d7b-a7c6-115807f58037/collection/1081433-6b812845-0178-4fa8-81cb-816504f70746?action=share&creator=1081433)

1. Open Postman Desktop App (required for localhost)
2. Set base URL to `http://localhost:3000`
3. For POST and PUT requests:
   - Go to **Body** tab → select **raw** → set type to **JSON**
   - Paste the request body

**Validation error response format:**
```json
{
  "errors": {
    "title": "title is required",
    "completed": "completed must be a boolean"
  }
}
```
