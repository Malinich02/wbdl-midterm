const Task = require("../models/task");

const deleteTask = async (taskId) => {
  try {
    const target = taskId ? await Task.findById(taskId) : await Task.findOne();
    if (!target) {
      console.log("No task found to delete");
      return;
    }
    const result = await Task.findByIdAndDelete(target._id);
    console.log(`Task has ID: ${target._id} deleted successfully!`);
    console.log(result);
  } catch (error) {
    console.error("Error delete task:", error);
  }
};

module.exports = deleteTask;

