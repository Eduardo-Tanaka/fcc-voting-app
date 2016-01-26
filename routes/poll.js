var express = require('express');
var router = express.Router();
var User = require('../models/model');
var Poll = require('../models/poll');
var d3 = require('d3');
var jsdom = require('jsdom');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/login');
}

router.post('/', isAuthenticated, function(req, res, next) {
  	User.findOne({ 'email' :  req.user.email }, 
        function(err, user) {
            // In case of any error, return using the done method
            if (err)
                return done(null, false, req.flash(err.message));

            var poll = new Poll();
            poll.title = req.body.poll;
            poll.user = user.email;
            var obj = [];
            for(var i = 0; i < req.body.polls.length; i++) {
            	obj.push({
            		name: req.body.polls[i],
                    count: 0
            	});
            }
            poll.options = obj;
            poll.username = user.username;
            // save the user
            poll.save(function(err) {
                if (err){
                    console.log('Error in Saving user: '+err);  
                    throw err;  
                }
                console.log('User Registration succesful');    
            });
            res.render('newpoll', { user: req.user, success: 'Poll created. Visit the link:', link: poll._id });
        }
    );
});

router.post('/vote', function(req, res, next) {
    Poll.findOne({ 'options._id': req.body.opt }, function(err, poll){
        var index;
        for(var i = 0; i < poll.options.length; i++) {
            if(poll.options[i]._id == req.body.opt){
                index = i;
            }
        }
        if (err)
            console.log(err.message);
        poll.options[index].count = poll.options[index].count + 1;
        poll.save(function(err) {
            if (err){
                console.log('Error in Saving: '+err);  
                throw err;  
            }
            console.log('Voted');    
        });
        res.render('pollresult', { user: req.user, id: poll._id });
    });
});

router.get('/pollresult/:id', function(req, res, next) {
    res.render('pollresult', { id: req.params.id, user: req.user });
});

router.get('/pollresultjson/:id', function(req, res, next) {
    Poll.findById(req.params.id, function(err, poll) {
        if (err)
            console.error(err);
        res.send(poll);
    });
});

module.exports = router;

