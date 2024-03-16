const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports');

router.get('/salary-distribution-histogram', reportsController.getSalaryDistributionHistogram);
router.get('/experience-comparison-bar-chart', reportsController.getExperienceComparisonBarChart);
router.get('/salary-vs-experience-scatter-plot', reportsController.getSalaryVsExperienceScatterPlot);
router.get('/candidate-status-bar-chart', reportsController.getCandidateStatusBarChart);

module.exports = router;
