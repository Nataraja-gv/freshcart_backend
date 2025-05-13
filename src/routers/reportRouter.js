const express = require("express");
const sellerAuth = require("../middleware/sellerauth");
const { reportAllDashboard } = require("../controllers/reportController");

const reportRouter = express.Router();

reportRouter.get("/seller/report", sellerAuth, reportAllDashboard);

module.exports = reportRouter;
