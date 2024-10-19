const mongoose = require("mongoose");

// Define the schema
const reportSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    detailExcel: {
      type: String, // Path to the uploaded detail Excel file
      required: true,
    },
    summaryExcel: {
      type: String, // Path to the uploaded summary Excel file
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
