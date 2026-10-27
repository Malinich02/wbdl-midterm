const express = require("express");
const connectDB = require("./config/connectdb");
const insertOne = require("./data/insertOne");
const insertMany = require("./data/insertMany");
const updateTask = require("./data/updateTask");
const deleteTask = require("./data/deleteTask");
const taskRoute = require("./routes/taskRoute");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Database connection
connectDB();

// Task Routes
app.use("/", taskRoute);

// Optional operations (uncomment as needed):
// updateTask();
// deleteTask();
// insertOne();
// insertMany();

// Startup Server NodeJS
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
