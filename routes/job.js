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

router.get('/new', isLoggedIn, getNewJobForm);

router.get('/:id/edit', isLoggedIn, getEditJobForm);

router.get('/:id', isLoggedIn, getParticularJob);

router.put('/:id', editParticularJob);

router.delete('/:id', deleteParticularJob);

router.get('/', isLoggedIn, getAllJobs);

router.post('/', createNewJob);

module.exports = router;
