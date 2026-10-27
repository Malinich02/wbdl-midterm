const Task = require("../models/task");

const insertMany = async () => {
  try {
    const tasks = [
      {
        task_title: "Setup Database Connection",
        description: "Configure MongoDB connection using Mongoose ODM",
        status: "Completed",
      },
      {
        task_title: "Create Task REST API",
        description: "Implement CRUD endpoints for task creation, retrieval, updates, and deletion",
        status: "In Progress",
      },
      {
        task_title: "Design Responsive UI Views",
        description: "Build clean and modern EJS templates for task list, create form, and modal dialogs",
        status: "In Progress",
      },
      {
        task_title: "Perform Quality Assurance & Testing",
        description: "Verify form validation, status updates, and edge cases in task lifecycle",
        status: "Pending",
      },
    ];

    const result = await Task.insertMany(tasks);
    console.log("Tasks inserted successfully!");
    console.log(result);
  } catch (error) {
    console.error("Insert many tasks error:", error);
  }
};

module.exports = insertMany;
