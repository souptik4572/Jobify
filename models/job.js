const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: new Date(),
	},
	location: {
		type: String,
		required: true,
	},
	isJobOpen: {
		type: Boolean,
		required: true,
	},
	employer: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		username: String,
	},
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
