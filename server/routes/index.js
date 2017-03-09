// routes/index.js, Jason Huang, 300818592, COMP308-W2017-AUTH 
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define the user model
let UserModel = require('../models/users');
let User = UserModel.User; //aliase for User Model - User Object

// define the game model
let book = require('../models/books');

// Create a function to check if the user is authenticated
function requireAuth(req, res, next) {
	// Checks if the user is logged 
	if(!req.isAuthenticated()){
		return res.redirect('/login');
	}
	next(); // If you are go to the next object
}

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
	res.render('content/index', {
		title: 'Home',
		books: '',
		displayName: req.user ? req.user.displayName: ''
	 });
});

router.get('/about', (req, res, next) => {
	res.render('content/about', {
	title: 'About',
	books: '',
	displayName: req.user ? req.user.displayName: ''
	});
});

router.get('/projects', (req, res, next) => {
	res.render('content/projects', {
	title: 'Projects',
	books: '',
	displayName: req.user ? req.user.displayName: ''
	});
});

router.get('/services', (req, res, next) => {
	res.render('content/services', {
	title: 'Services',
	books: '',
	displayName: req.user ? req.user.displayName: ''
	});
});

router.get('/contact', (req, res, next) => {
	res.render('content/contact', {
	title: 'Contacts',
	books: '',
	displayName: req.user ? req.user.displayName: ''
	});
});

// GET /Login - render the Login view
router.get('/login', (req, res, next) => {
	// Check to see if the user is not already logged index
	if(!req.user){
		//render the Login page
		res.render('auth/login', {
			title: "Login",
			books: '',
			messages: req.flash('loginMessage'),
			displayName: req.user ? req.user.displayName: '' //? either .user or .displayname
		});
		return; 
	} else {
		return res.redirect('/books'); //redirect to games list
	}
});

// POST /Login - process the Login attempt
router.post('/login', passport.authenticate('local', {
	successRedirect: '/books',
	failureRedirect: '/login',
	failureFlash: "Incorrect Username/Password", // match the loginMessage above
}));

// GET /register - render the registration view
router.get('/register', (req, res, next)=>{
	 // check to see if the user is not already logged in
	if(!req.user) {
		// render the registration page
			res.render('auth/register', {
			title: "Register",
			books: '',
			messages: req.flash('registerMessage'),
			displayName: req.user ? req.user.displayName : ''
		});
		return;
	} else {
		return res.redirect('/books'); // redirect to books list
	}
});

// POST / register - process the registration submission
router.post('/register', (req, res, next)=>{
	User.register(
		new User({
			username: req.body.username,
			//password: req.body.password,
			email: req.body.email,
			displayName: req.body.displayName
		}),
		req.body.password,
		(err) => {
			if(err) {
				console.log('Error inserting new user');
				if(err.name == "UserExistsError") {
					req.flash('registerMessage', 'Registration Error: User Already Exists');
				}
				return res.render('auth/register', {
					title: "Register",
					books: '',
					messages: req.flash('registerMessage'),
					displayName: req.user ? req.user.displayName : ''
				});
			}
			// if registration is successful
			return passport.authenticate('local')(req, res, ()=>{
				res.redirect('/books');
			});
		});
});

// GET /logout - process the logout request
router.get('/logout', (req, res, next)=>{
	req.logout();
	res.redirect('/'); // redirect to the home page
});

module.exports = router;
