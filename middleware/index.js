// Our middleware

// saving our logged in user as our current user
const saveLoggedInUser = (req, res, next) => {
	res.locals.currentUser = req.user;
	next();
};

// logged in check middleware
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/auth/login');
};

module.exports = {
	saveLoggedInUser,
	isLoggedIn,
};
