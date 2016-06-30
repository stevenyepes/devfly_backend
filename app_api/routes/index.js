var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/posts');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');
var router = express.Router();
/* Configure jwt module for routes */
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// posts
router.get('/posts', auth,ctrlPosts.postsListAll);
router.post('/posts', auth,ctrlPosts.postsCreate);
router.get('/posts/:postid', auth,ctrlPosts.postsReadOne);
router.put('/posts/:postid', auth,ctrlPosts.postsUpdateOne);
router.delete('/posts/:postid', auth,ctrlPosts.postsDeleteOne);
// reviews
router.post('/posts/:postid/reviews', auth,ctrlReviews.reviewsCreate);
router.get('/posts/:postid/reviews/:reviewid',auth, ctrlReviews.reviewsReadOne);
router.put('/posts/:postid/reviews/:reviewid', auth,ctrlReviews.reviewsUpdateOne);
router.delete('/posts/:postid/reviews/:reviewid', auth,ctrlReviews.reviewsDeleteOne);
// Auth
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
