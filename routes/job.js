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

router.get('/employer/new', isLoggedIn, getNewJobForm);

router.get('/employer/:id/edit', isLoggedIn, getEditJobForm);

router.get('/employer/:id', isLoggedIn, getParticularJob);

router.put('/employer/:id', isLoggedIn, editParticularJob);

router.delete('/employer/:id', isLoggedIn, deleteParticularJob);

router.get('/employer', isLoggedIn, getAllJobs);

router.post('/employer', isLoggedIn, createNewJob);

router.get('/candidate/receivedjobs', isLoggedIn, getReceivedJobs);

router.get('/candidate/acceptedjobs', isLoggedIn, getAcceptedJobs);

router.post('/candidate/acceptedjobs/:id', isLoggedIn, createAcceptedJob);

router.delete('/candidate/acceptedjobs/:id', isLoggedIn, deleteAcceptedJob);

router.get('/candidate/rejectedjobs', isLoggedIn, getRejectedJobs);

router.post('/candidate/rejectedjobs/:id', isLoggedIn, createRejectedJob);

router.delete('/candidate/rejectedjobs/:id', isLoggedIn, deleteRejectedJob);

router.get('/', (req, res) => {
	if (req.user.isEmployer) res.redirect('/jobs/employer');
	else res.redirect('/jobs/candidate/receivedjobs');
});

module.exports = router;
