var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/login');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user, signup: true });
});

router.get('/mypolls', isAuthenticated, function(req, res, next) {
	Poll.find({ 'user' :  req.user.email }, 
        function(err, polls) {
            // In case of any error, return using the done method
            if (err)
                return done(null, false, req.flash(err.message));

            res.render('mypolls', { user: req.user, polls: polls });
        }
    );	
});

router.get('/delete/:id', isAuthenticated, function(req, res, next) {
	Poll.remove({ '_id': req.params.id }, function(err){
		if (err)
			console.log(err);
		console.log("deleted poll");
		res.redirect('/mypolls');
	});
});

router.get('/poll/:id', function(req, res, next) {
	Poll.findOne({ '_id': req.params.id }, function(err, poll){
		if (err)
			console.log(err.message);
		res.render('poll', { user: req.user, poll: poll });
	});
});

module.exports = router;
