const mongoose = require("mongoose");

// Create schemaTask
const schemaTask = new mongoose.Schema({
  task_title: {
    type: String,
    required: [true, "Task title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
    trim: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("tbltasks", schemaTask);

