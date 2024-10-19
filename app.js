// app.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Serve the 'uploads' folder statically for downloading files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Use the report routes
app.use("/api", reportRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
