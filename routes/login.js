var express = require('express');
var router = express.Router();

module.exports = function(passport){
	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('login', { message: req.flash('message') });
	});

	/* Requisição POST para LOGIN */
	router.post('/', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true
	}));

	return router;
}