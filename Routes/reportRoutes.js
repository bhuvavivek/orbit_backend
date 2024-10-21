const express = require("express");
const router = express.Router();
const { uploadReport, getReports } = require("../controller/reportController");
const upload = require("../middleware/uploadMiddleware");
const { validateUpload } = require("../middleware/validationMiddleware");
const { createUser, loginUser } = require("../controller/userController");
const validateUser = require("../middleware/userMiddleware");
const checkAuthToken = require("../middleware/authMiddleware");

// Create user route
router.get("/register", validateUser, createUser);

// Login user
router.post("/login", validateUser, loginUser);

// Route for uploading the report

router.post(
  "/upload-report",
  checkAuthToken,
  upload.fields([
    { name: "detailExcel", maxCount: 1 },
    { name: "summaryExcel", maxCount: 1 },
  ]),
  validateUpload,
  uploadReport
);

// Route for fetching all reports
router.get("/reports", checkAuthToken, getReports);

module.exports = router;
