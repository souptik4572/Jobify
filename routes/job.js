const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

const Job = require('../models/job');

const {
	getNewJobForm,
	getEditJobForm,
	getParticularJob,
	editParticularJob,
	deleteParticularJob,
	getAllJobs,
	createNewJob,
} = require('../controllers/jobs');

router.get('/employer/new', isLoggedIn, getNewJobForm);

router.get('/employer/:id/edit', isLoggedIn, getEditJobForm);

router.get('/employer/:id', isLoggedIn, getParticularJob);

router.put('/employer/:id', editParticularJob);

router.delete('/employer/:id', deleteParticularJob);

router.get('/employer', isLoggedIn, getAllJobs);

router.post('/employer', createNewJob);

router.get('/candidate', isLoggedIn, (req, res) => {
	Job.find({}, (error, jobs) => {
		if (error) {
			console.log('Oops got an error while fetching all jobs');
			return;
		}
		res.render('CandidateDashboard', { jobs });
	});
});

router.get('/', (req, res) => {
	if (req.user.isEmployer) res.redirect('/jobs/employer');
	else res.redirect('/jobs/candidate');
});

module.exports = router;
