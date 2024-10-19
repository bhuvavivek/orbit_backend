const express = require("express");
const router = express.Router();
const {
  uploadReport,
  getAllReports,
  getFilteredReports,
} = require("../controller/reportController");
const upload = require("../middleware/uploadMiddleware");
const { validateUpload } = require("../middleware/validationMiddleware");
const { createUser, loginUser } = require("../controller/userController");
const validateUser = require("../middleware/userMiddleware");

// Create user route
router.get("/register", validateUser, createUser);

// Login user
router.post("/login", validateUser, loginUser);

// Route for uploading the report

router.post(
  "/upload-report",
  upload.fields([
    { name: "detailExcel", maxCount: 1 },
    { name: "summaryExcel", maxCount: 1 },
  ]),
  uploadReport
);

// Route for fetching all reports
router.get("/reports", getAllReports);

// Route for fetching filtered reports
router.get("/reports/filter", getFilteredReports);

module.exports = router;
