const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getJobsApplied,
    checkTheStatusOfTheJob,
} = require('../controllers/userApplicationController');
const checkAuth = require('../middleware/checkAuth');

router.get('/',checkAuth , getJobsApplied );
router.post('/apply/:jobId', checkAuth , applyForJob);
router.get('/:applicationId', checkTheStatusOfTheJob);

module.exports = router;
