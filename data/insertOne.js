const Task = require("../models/task");

const insertOne = async () => {
  try {
    const addTask = new Task({
      task_title: "Design System Architecture",
      description: "Define database schemas, models, and RESTful routing for task management.",
      status: "In Progress",
    });
    const result = await addTask.save();
    console.log("Task created successfully!");
    console.log(result);
  } catch (error) {
    console.error("Insert task error:", error);
  }
};

module.exports = insertOne;
