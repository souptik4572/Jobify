const passport = require('passport');
const User = require('../models/user');

// Get register form
const getRegisterForm = (req, res) => {
	res.render('register');
};

// Create and register new user
const registerUser = (req, res) => {
	const { username, name, password, isEmployer } = req.body;
	User.register(
		new User({ username, name, isEmployer: !!isEmployer }),
		password,
		(error, user) => {
			if (error) {
				console.log(error);
				return res.render('register');
			}
			passport.authenticate('local')(req, res, () => {
				res.redirect('/secret');
			});
		}
	);
};

// Get login form
const getLoginForm = (req, res) => {
	res.render('login');
};

// Logout user
const logoutUser = (req, res) => {
	req.logout();
	res.redirect('/');
};

module.exports = {
	getRegisterForm,
	registerUser,
	getLoginForm,
	logoutUser,
};
