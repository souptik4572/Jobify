const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
	getRegisterForm,
	registerUser,
	getLoginForm,
	logoutUser,
} = require('../controllers/authentication');

// Get register form
router.get('/register', getRegisterForm);

// Create and register new user
router.post('/register', registerUser);

// Get login form
router.get('/login', getLoginForm);

// Login user
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/jobs',
		failureRedirect: '/auth/login',
	}),
	(req, res) => {}
);

// Logout user
router.get('/logout', logoutUser);

module.exports = router;
