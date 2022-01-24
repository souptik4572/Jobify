const express = require('express');
const configureMongoose = require('./config/mongoose-config');
const configurePassport = require('./config/passport-config');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { saveLoggedInUser } = require('./middleware');

// // Configuring our Mongo database with mongoose
configureMongoose();

const jobRouter = require('./routes/job');
const authenticationRouter = require('./routes/authentication');

const app = express();

// Configuring authentication and authorization using passport
configurePassport(app);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(saveLoggedInUser);

// All of our authentication routes
app.use('/auth', authenticationRouter);
// All our job routes
app.use('/jobs', jobRouter);

// Our root route to our home page
app.get('/', (req, res) => {
	res.sendFile('index.html');
});

// Our error (does not exist) route
app.get('*', (req, res) => {
	res.sendFile('./public/error404.html', { root: __dirname });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App is running at http://localhost:${PORT}`);
});
