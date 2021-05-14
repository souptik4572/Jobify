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
} = require('../controllers/jobs');

router.get('/employer/new', isLoggedIn, getNewJobForm);

router.get('/employer/:id/edit', isLoggedIn, getEditJobForm);

router.get('/employer/:id', isLoggedIn, getParticularJob);

router.put('/employer/:id', editParticularJob);

router.delete('/employer/:id', deleteParticularJob);

router.get('/employer', isLoggedIn, getAllJobs);

router.post('/employer', createNewJob);

module.exports = router;
