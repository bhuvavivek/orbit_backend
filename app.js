// app.js

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { createUser, loginUser } = require("./controller/userController");
const validateUser = require("./middleware/userMiddleware");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Create user route
app.get("/register", validateUser, createUser);

// Login user
app.post("/login", validateUser, loginUser);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
