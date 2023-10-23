const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getJobsApplied,
} = require('../controllers/userApplicationController');
const checkAuth = require('../middleware/checkAuth');

router.get('/',checkAuth , getJobsApplied );
router.post('/apply/:jobId', checkAuth , applyForJob);

module.exports = router;
