const Report = require("../models/report.js");

// Upload report handler
exports.uploadReport = async (req, res) => {
  try {
    const { platform, month, year } = req.body;
    console.log(req.body);
    console.log(req.files);
    const detailExcel = req.files["detailExcel"][0].path;
    const summaryExcel = req.files["summaryExcel"][0].path;

    const report = new Report({
      platform,
      month,
      year,
      detailExcel,
      summaryExcel,
    });

    await report.save();
    res.status(201).json({ message: "Report uploaded successfully", report });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload report", error });
  }
};

// Get all reports handler
exports.getReports = async (req, res) => {
  const {
    platform,
    month,
    year,
    sortMonth,
    sortYear,
    search,
    page = 1,
    limit = 10,
  } = req.query;
  const query = {};
  const sort = {};

  if (platform) query.platform = platform;
  if (month) query.month = month;
  if (year) query.year = year;

  if (sortMonth) sort.month = sortMonth === "asc" ? 1 : -1;
  if (sortYear) sort.year = sortYear === "asc" ? 1 : -1;
  if (search && search.trim().length > 0) {
    const regex = new RegExp(search, "i"); // 'i' for case-insensitive
    query.$or = [{ platform: regex }, { month: regex }];
    if (!isNaN(search)) {
      query.$or.push({
        $expr: {
          $regexMatch: {
            input: { $toString: "$year" },
            regex: search,
            options: "i",
          },
        },
      });
    }
  }

  const skip = (page - 1) * limit;

  try {
    const totalCount = await Report.countDocuments(query);
    const reports = await Report.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({
      reports,
      totalCount,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve reports", error });
  }
};
