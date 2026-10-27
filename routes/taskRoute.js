const express = require("express");
const path = require("path");
const Task = require("../models/task");

const router = express.Router();

// Route Home Page (Create Task Form)
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Route Save Task (POST)
router.post("/save", async (req, res) => {
  try {
    const task_title = req.body.task_title || req.body.taskTitle || req.body.productName;
    const description = req.body.description;
    const status = req.body.status || "Pending";

    const newTask = new Task({
      task_title,
      description,
      status,
    });

    await newTask.save();
    return res.redirect("/tasks");
  } catch (error) {
    console.error("Error inserting task:", error);
    res.status(500).send("Error inserting task: " + error.message);
  }
});

// Route List Tasks (GET)
router.get("/tasks", async (req, res) => {
  try {
    const listtask = await Task.find().sort({ created_date: -1 });
    res.render("task", {
      listtask,
      listproduct: listtask, // compatibility with older views
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Error loading task list");
  }
});

// Backwards compatibility redirect
router.get("/products", (req, res) => {
  res.redirect("/tasks");
});

// Route Show Delete Confirmation Page (GET)
router.get("/delete/:id", async (req, res) => {
  try {
    const listtask = await Task.findById(req.params.id);
    if (!listtask) {
      return res.status(404).send("Task not found");
    }
    res.render("deletetask", {
      listtask,
      listproduct: listtask, // compatibility
    });
  } catch (error) {
    console.error("Error finding task:", error);
    res.status(500).send("Error loading delete page");
  }
});

// Route Delete Task (POST)
router.post("/delete/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.redirect("/tasks");
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Error deleting task");
  }
});

// Route Show Update Page (GET)
router.get("/update/:id", async (req, res) => {
  try {
    const listtask = await Task.findById(req.params.id);
    if (!listtask) {
      return res.status(404).send("Task not found");
    }
    res.render("updatetask", {
      listtask,
      listproduct: listtask, // compatibility
    });
  } catch (error) {
    console.error("Error finding task ID:", error);
    res.status(500).send("Error loading update page");
  }
});

// Route Update Task (POST)
router.post("/update/:id", async (req, res) => {
  try {
    const task_title = req.body.task_title || req.body.taskTitle || req.body.productname;
    const description = req.body.description;
    const status = req.body.status || "Pending";

    await Task.findByIdAndUpdate(
      req.params.id,
      {
        task_title,
        description,
        status,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    return res.redirect("/tasks");
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Error updating task: " + error.message);
  }
});

// API Routes (JSON endpoints for testing / Postman)
router.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ created_date: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/api/tasks", async (req, res) => {
  try {
    const { task_title, description, status } = req.body;
    const newTask = new Task({
      task_title,
      description,
      status: status || "Pending",
    });
    const savedTask = await newTask.save();
    res.status(201).json({ success: true, data: savedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/api/tasks/:id", async (req, res) => {
  try {
    const { task_title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { task_title, description, status },
      { runValidators: true, new: true }
    );
    res.json({ success: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: `Task ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

