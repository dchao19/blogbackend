var express = require('express');
var passport = require('passport');
var router = express.Router();

var Account = require('../models/Account');
var Post = require('../models/Post');
var Comment = require('../models/Comment');

router.get('/', function(req, res) {
    res.json({message: 'blog ready to go!'});
});

router.get('/posts', function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) {
            res.status(500).json({success: false, errMessage: err});
        } else if (posts) {
            res.json({success: true, result: posts});
        } else {
            res.json({success: true, result: posts});
        }
    });
});

router.get('/posts/:id', function(req, res) {
    Post.findOne({_id: req.params.id}, function(err, post) {
        if (err) {
            res.status(400).json({success: false, errMessage: err});
        } else if (post) {
            res.json({success: true, result: post});
        } else {
            res.status(400).json({success: false, errMessage: 'That post ID wasn\'t found!'});
        }
    });
});

router.post('/posts/:id/comment', function(req, res) {
    Post.findOne({_id: req.params.id}, function(err, post) {
        if (err) {
            res.status(400).json({success: false, errMessage: err});
        } else if (post) {
            var newComment = new Comment({
                name: req.body.name,
                text: req.body.text
            });

            post.comments.push(newComment);
            post.save();

            res.json({success: true, result: newComment});
        } else {
            res.status(400).json({success: false, errMessage: 'That post ID wasn\'t found!'});
        }
    });
});

router.post('/auth/register', function(req, res) {
    Account.register(new Account({username: req.body.username, userType: 'regular'}), req.body.password, function(err, account) {
        if (err) {
            res.status(400).json({success: false, errMessage: err});
        } else if (account) {
            res.json({succes: true, message: "Successfully created the account!"});
        } else {
            res.status(500).json({success: false, errMessage: 'This account wasn\'t created for some reason'});
        }
    });
});

router.use(passport.authenticate('local'), function(req, res, next) {
    next();
});

router.get('/auth/testAuth', function(req, res) {
    console.log(req.user);
    res.json({success: true, message: 'Successfully signed in!'});
});

router.post('/posts/new', function(req, res) {
    if (req.user.userType === 'admin') {
        Post.create({
            content: req.body.content,
            title: req.body.title,
            tags: req.body.tags
        }, function(err, post) {
            if (err) {
                res.status(400).json({success: false, errMessage: err});
            } else if (post) {
                res.json({success: true, result: post});
            } else {
                res.status(500).json({success: false, errMessage: 'An internal server error has occured'});
            }
        });
    } else {
        res.status(401).json({success: false, errMessage: 'This endpoint requires administator privileges.'});
    }
});

module.exports = router;
