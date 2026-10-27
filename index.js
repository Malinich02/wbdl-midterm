const express = require("express");
const app = express();
const PORT = 3000;

const studentid = 1;
const studentname = "Chea Sovan Malinich";
const studentgroup = "SW13";
const subject = "Web Based Development I";
const payment = 12000;

// 1. Format currency
// 12000 => $12,000.00
const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// 2. Format student ID
// 1 => 00001
const formatid = studentid.toString().padStart(5, "0");

// Enable JSON
app.use(express.json());

// GET root path /
app.get("/", (req, res) => {
  res.send(
    "<strong>Welcome to NodeJS Framework</strong>" +
      "<br>" +
      "1. Student ID: " +
      formatid +
      "<br>" +
      "2. Student Name: <strong>" +
      studentname +
      "</strong><br>" +
      "3. Student Group: " +
      studentgroup +
      "<br>" +
      "4. Subject: <mark>" +
      subject +
      "</mark><br>" +
      "5. I will pay: <strong>" +
      USDollar.format(payment) +
      "</strong>"
  );
});

// 3. Using method GET
app.get("/welcome", (req, res) => {
  res.json("Welcome to API");
});

// Using method POST to add student information
app.post("/welcome/student", (req, res) => {
  const { studentid, studentname, gender, age, subject, payment } = req.body;

  res.json({
    data: {
      studentid,
      studentname,
      gender,
      age,
      subject,
      payment,
    },
    message: "Student created successfully!",
  });
});

// Using method POST to add a new task
app.post("/welcome/task", (req, res) => {
  const { id, task_title, description, status } = req.body;

  res.status(201).json({
    success: "Task created successfully!",
    data: {
      id,
      task_title,
      description,
      status: status || "Pending",
    },
  });
});

// Using method PUT to update task information
app.put("/welcome/task/:id", (req, res) => {
  const id = req.params.id;
  const { task_title, description, status } = req.body;

  res.json({
    success: `Task has id:${id} updated successfully!`,
    data: { id, task_title, description, status },
  });
});

// Using method DELETE to delete task by ID
app.delete("/welcome/task/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    success: `Task has id: ${id} deleted successfully!`,
  });
});

// Legacy Product Route Support
app.post("/welcome/product", (req, res) => {
  const { id, productname, description, status } = req.body;
  res.status(201).json({
    success: "Task created successfully!",
    data: { id, task_title: productname, description, status: status || "Pending" },
  });
});

app.put("/welcome/product/:id", (req, res) => {
  const id = req.params.id;
  const { productname, description, status } = req.body;
  res.json({
    success: `Task has id:${id} updated successfully!`,
    data: { id, task_title: productname, description, status },
  });
});

app.delete("/welcome/product/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    success: `Task has id: ${id} deleted successfully!`,
  });
});

// Startup Server NodeJS
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
