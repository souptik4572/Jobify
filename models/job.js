const mongoose = require('mongoose');
const shortid = require('shortid');
const currentDate = new Date();

const JobSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
	},
	title: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	isJobOpen: {
		type: Boolean,
		default: true,
	},
	company: {
		type: String,
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
