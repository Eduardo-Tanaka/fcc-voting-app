var express = require('express');
var router = express.Router();
var User = require('../models/model');
var bCrypt = require('bcryptjs');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/login');
}
	
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('password', { user: req.user });
});

router.post('/', isAuthenticated, function(req, res, next) {
  	User.findOne({ 'email' :  req.user.email }, 
        function(err, user) {
            // In case of any error, return using the done method
            if (err)
                return done(null, false, req.flash(err.message));
            // User and password both match, return user from done method
            // which will be treated like success
            if (!isValidPassword(user, req.body.current)) {
            	res.render('password', { user: user, message: "Invalid Password." });
            	return ;
            };
            user.password = createHash(req.body.password);

            // save the user
            user.save(function(err) {
                if (err){
                    console.log('Error in Saving user: '+err);  
                    throw err;  
                }
                console.log('User Registration succesful');    
            });
            res.render('password', { user: req.user, success: 'Password changed.' });
        }
    );

	// Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
});

module.exports = router;
