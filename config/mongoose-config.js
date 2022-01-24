if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const mongoose = require('mongoose');
const url = process.env.DATABASEURL || 'mongodb://localhost:27017/job_portal_db';

const configureMongoose = () => {
	mongoose.connect(
		url,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		},
		() => {
			console.log('Successfully connected to mongodb');
		}
	);
};

module.exports = configureMongoose;