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
		res.render('ShowJob', { job });
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

// Get all received jobs for a candidate
const getReceivedJobs = (req, res) => {
	Job.find({}, (error, jobs) => {
		if (error) {
			console.log('Oops got an error while fetching all jobs');
			return;
		}
		const filteredJobs = jobs.filter(
			(aJob) =>
				!aJob.candidatesWhoAccepted.includes(req.user._id) &&
				!aJob.candidatesWhoRejected.includes(req.user._id)
		);
		res.render('CandidateDashboard', { jobs: filteredJobs, fromPage: 'receivedJobs' });
	});
};

// Get all accepted jobs for a candidate
const getAcceptedJobs = (req, res) => {
	Job.find({}, (error, jobs) => {
		if (error) {
			console.log('Oops got an error while fetching all jobs');
			return;
		}
		const filteredJobs = jobs.filter((aJob) =>
			aJob.candidatesWhoAccepted.includes(req.user._id)
		);
		res.render('CandidateDashboard', { jobs: filteredJobs, fromPage: 'acceptedJobs' });
	});
};

// Mark a received job as accepted job
const createAcceptedJob = (req, res) => {
	const { id } = req.params;
	Job.findById(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while fetching a job');
			return;
		}
		job.candidatesWhoAccepted.push(req.user._id);
		job.save((error, user) => {
			if (error) {
				console.log('Oops got an error while saving job');
				return;
			}
			res.redirect('/jobs/candidate/acceptedjobs');
		});
	});
};

// Delete a received job from the accepted job list
const deleteAcceptedJob = (req, res) => {
	const { id } = req.params;
	Job.findById(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while fetching a job');
			return;
		}
		job.candidatesWhoAccepted.splice(job.candidatesWhoAccepted.indexOf(req.user._id), 1);
		job.save((error, user) => {
			if (error) {
				console.log('Oops got an error while saving job');
				return;
			}
			res.redirect('/jobs/candidate/receivedjobs');
		});
	});
};

// Get all accepted jobs for a candidate
const getRejectedJobs = (req, res) => {
	Job.find({}, (error, jobs) => {
		if (error) {
			console.log('Oops got an error while fetching all jobs');
			return;
		}
		const filteredJobs = jobs.filter((aJob) =>
			aJob.candidatesWhoRejected.includes(req.user._id)
		);
		res.render('CandidateDashboard', { jobs: filteredJobs, fromPage: 'rejectedJobs' });
	});
};

// Mark a received job as rejected job
const createRejectedJob = (req, res) => {
	const { id } = req.params;
	Job.findById(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while fetching all jobs');
			return;
		}
		job.candidatesWhoRejected.push(req.user._id);
		job.save((error, user) => {
			if (error) {
				console.log('Oops got an error while saving user');
				return;
			}
			res.redirect('/jobs/candidate/rejectedjobs');
		});
	});
};

// Delete a received job from the rejected list
const deleteRejectedJob = (req, res) => {
	const { id } = req.params;
	Job.findById(id, (error, job) => {
		if (error) {
			console.log('Oops got an error while fetching a job');
			return;
		}
		job.candidatesWhoRejected.splice(job.candidatesWhoRejected.indexOf(req.user._id), 1);
		job.save((error, user) => {
			if (error) {
				console.log('Oops got an error while saving job');
				return;
			}
			res.redirect('/jobs/candidate/receivedjobs');
		});
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
	getReceivedJobs,
	getAcceptedJobs,
	createAcceptedJob,
	deleteAcceptedJob,
	getRejectedJobs,
	createRejectedJob,
	deleteRejectedJob,
};
