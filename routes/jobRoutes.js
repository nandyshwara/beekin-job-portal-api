const express = require('express');
const router = express.Router();
const {
    getAllJobs,
    getJobByID,
    updateJob,
    createJob,
    deleteJob,
    getAllJobCategories
} = require('../controllers/jobController');

router.get('/all', getAllJobs);
router.get('/allcategories', getAllJobCategories);
router.get('/:jobId',getJobByID );
router.post('/create', createJob);
router.put('/update', updateJob);
router.delete('/delete/:jobId', deleteJob);

module.exports = router;
