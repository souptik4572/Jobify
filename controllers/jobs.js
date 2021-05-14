const Job = require('../models/job');

// Get new job form
const getNewJobForm = (req, res) => {
	res.render('NewJob');
};

// Get edit form for existing job
const getEditJobForm = (req, res) => {
	const { id } = req.params;
	Job.findById(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while getting a particular job for edit');
			return;
		}
		res.render('EditJob', { job });
	});
};

// Get details of a particular job
const getParticularJob = (req, res) => {
	const { id } = req.params;
	Job.findById(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while getting a particular job');
			return;
		}
		res.send(job);
	});
};

// Submit edit form to update job details
const editParticularJob = (req, res) => {
	let { job } = req.body;
	job.isJobOpen = !!job.isJobOpen;
	const { id } = req.params;
	Job.findByIdAndUpdate(id, job, (error, job) => {
		if (error) {
			console.log('Oops got an error while editing job', error);
			return;
		}
		res.redirect('/jobs/employer');
	});
};

// Delete a particular job
const deleteParticularJob = (req, res) => {
	const { id } = req.params;
	Job.findByIdAndDelete(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while deleting a job', error);
			return;
		}
		res.redirect('/jobs/employer');
	});
};

// Get list of all jobs
const getAllJobs = (req, res) => {
	const employer = req.user.isEmployer
		? {
				id: req.user._id,
				username: req.user.username,
		  }
		: {};
	Job.find({ employer }, (error, jobs) => {
		if (error) {
			console.log('Oops got an error while fetching all jobs', error);
			return;
		}
		if (req.user.isEmployer) res.render('EmployerDashboard', { jobs });
	});
};

// Create a new job
const createNewJob = (req, res) => {
	const { job } = req.body;
	const { _id, username } = req.user;
	job.employer = {
		id: _id,
		username: username,
	};
	job.date = new Date();
	Job.create(job, (error, job) => {
		if (error) {
			console.log('Oops got an error while creating new job', error);
			return;
		}
		res.redirect('/jobs/employer');
	});
};

module.exports = {
	getNewJobForm,
	getEditJobForm,
	getParticularJob,
	editParticularJob,
	deleteParticularJob,
	getAllJobs,
	createNewJob,
};
