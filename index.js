const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
// Our DB models
const User = require('./models/user');

const jobRouter = require('./routes/job');
const authenticationRouter = require('./routes/authentication');

const url = process.env.DATABASEURL || 'mongodb://localhost:27017/job_portal_db';

mongoose.connect(
	`mongodb+srv://asta:telephone@cluster0.9fr0a.mongodb.net/job_portal_db?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	}
);

const app = express();

app.use(
	expressSession({
		secret: 'job-portal',
		resave: false,
		saveUninitialized: false,
	})
);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// Configuring passport in our App
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

// All our routes
app.use('/jobs', jobRouter);
app.use('/auth', authenticationRouter);

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

app.get('*', (req, res) => {
	res.sendFile('./public/error404.html', { root: __dirname });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App is running at http://localhost:${PORT}. Enjoy`);
});
