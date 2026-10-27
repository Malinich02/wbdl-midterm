function getTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const task = {
        taskId: 1,
        task_title: "Implement Task Management System",
        description: "Develop CRUD endpoints and EJS views for tasks",
        status: "In Progress",
      };
      resolve(task);
    }, 1000);
  });
}

async function displayTask() {
  try {
    console.log("Loading task information...");
    const task = await getTask();
    console.log("======= TASK INFORMATION =======");
    console.log("1. Task ID          :", task.taskId);
    console.log("2. Task Title       :", task.task_title);
    console.log("3. Task Status      :", task.status);
    console.log("4. Task Description :", task.description);
    console.log("================== END =================");
  } catch (error) {
    console.error("Error loading task:", error);
  }
}

displayTask();

module.exports = { getTask, displayTask };

