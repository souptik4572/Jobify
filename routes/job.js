const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

const {
	getNewJobForm,
	getEditJobForm,
	getParticularJob,
	editParticularJob,
	deleteParticularJob,
	getAllJobs,
	createNewJob,
	getReceivedJobs,
	getAcceptedJobs,
	createAcceptedJob,
	deleteAcceptedJob,
	getRejectedJobs,
	createRejectedJob,
	deleteRejectedJob,
} = require('../controllers/jobs');

// Get new job form
router.get('/employer/new', isLoggedIn, getNewJobForm);

// Get edit form for existing job
router.get('/employer/:id/edit', isLoggedIn, getEditJobForm);

// Get details of a particular job
router.get('/employer/:id', isLoggedIn, getParticularJob);

// Submit edit form to update job details
router.put('/employer/:id', isLoggedIn, editParticularJob);

// Delete a particular job
router.delete('/employer/:id', isLoggedIn, deleteParticularJob);

// Get list of all jobs
router.get('/employer', isLoggedIn, getAllJobs);

// Create a new job
router.post('/employer', isLoggedIn, createNewJob);

// Get all received jobs for a candidate
router.get('/candidate/receivedjobs', isLoggedIn, getReceivedJobs);

// Get all accepted jobs for a candidate
router.get('/candidate/acceptedjobs', isLoggedIn, getAcceptedJobs);

// Mark a received job as accepted job
router.post('/candidate/acceptedjobs/:id', isLoggedIn, createAcceptedJob);

// Delete a received job from the accepted job list
router.delete('/candidate/acceptedjobs/:id', isLoggedIn, deleteAcceptedJob);

// Get all rejected jobs for a candidate
router.get('/candidate/rejectedjobs', isLoggedIn, getRejectedJobs);

// Mark a received job as rejected job
router.post('/candidate/rejectedjobs/:id', isLoggedIn, createRejectedJob);

// Delete a received job from the rejected list
router.delete('/candidate/rejectedjobs/:id', isLoggedIn, deleteRejectedJob);

router.get('/', isLoggedIn, (req, res) => {
	if (req.user.isEmployer) res.redirect('/jobs/employer');
	else res.redirect('/jobs/candidate/receivedjobs');
});

module.exports = router;
