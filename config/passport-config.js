const passport = require('passport');
const LocalStrategy = require('passport-local');
const expressSession = require('express-session');

// Our authenticated DB models
const User = require('../models/user');

const configurePassport = (app) => {
	app.use(
		expressSession({
			secret: 'job-portal',
			resave: false,
			saveUninitialized: false,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	// Configuring passport in our App
	passport.use(new LocalStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
};

module.exports = configurePassport;
