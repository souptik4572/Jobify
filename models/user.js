const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	name: String,
	phoneNumber: String,
	password: String,
	isEmployer: {
		type: Boolean,
		default: false,
	},
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;
