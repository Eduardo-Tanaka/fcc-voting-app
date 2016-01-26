var express = require('express');
var router = express.Router();

module.exports = function(passport){
	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('signup', { message: req.flash('message')});
	});

	router.post('/', passport.authenticate('signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	return router;
}