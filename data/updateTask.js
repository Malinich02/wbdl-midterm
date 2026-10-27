const Task = require("../models/task");

const updateTask = async () => {
  try {
    const sample = await Task.findOne();
    if (!sample) {
      console.log("No task found to update");
      return;
    }
    const result = await Task.findByIdAndUpdate(
      sample._id,
      {
        task_title: sample.task_title + " (Completed)",
        status: "Completed",
        description: sample.description || "Task has been updated.",
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("Task updated successfully!", result);
  } catch (error) {
    console.error("Update task error:", error);
  }
};

module.exports = updateTask;

