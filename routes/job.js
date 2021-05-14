const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

const User = require('../models/user');
const Job = require('../models/job');

router.get('/new', isLoggedIn, (req, res) => {
	res.send('Form to create new job comes here');
});

router.get('/:id/edit', isLoggedIn, (req, res) => {
	const { id } = req.params;
	Job.findById(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while getting a particular job for edit');
			return;
		}
		res.send(job);
	});
});

router.get('/:id', isLoggedIn, (req, res) => {
	const { id } = req.params;
	Job.findById(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while getting a particular job');
			return;
		}
		res.send(job);
	});
});

router.put('/:id', (req, res) => {
	const { job } = req.body;
	const { id } = req.params;
	Job.findByIdAndUpdate(id, job, (error, job) => {
		if (error) {
			console.log('Oops got an error while editing job', error);
			return;
		}
		res.send(job);
	});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Job.findByIdAndDelete(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while deleting a job', error);
			return;
		}
		res.send(job);
	});
});

router.get('/', isLoggedIn, (req, res) => {
	Job.find({}, (error, jobs) => {
		if (error) {
			console.log('Oops got an error while fetching all jobs', error);
			return;
		}
		res.send(jobs);
	});
});

router.post('/', (req, res) => {
	const { job } = req.body;
	const { _id, username } = req.user;
	job.employer = {
		id: _id,
		username: username,
	};
	Job.create(job, (error, job) => {
		if (error) {
			console.log('Oops got an error while creating new job', error);
			return;
		}
		res.send(job);
	});
});

module.exports = router;
