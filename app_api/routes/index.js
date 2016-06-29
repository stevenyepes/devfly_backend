var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/posts');
var ctrlReviews = require('../controllers/reviews');

// locations
router.get('/posts', ctrlPosts.postsListAll);
router.post('/posts', ctrlPosts.postsCreate);
router.get('/posts/:postid', ctrlPosts.postsReadOne);
router.put('/posts/:postid', ctrlPosts.postsUpdateOne);
router.delete('/posts/:postid', ctrlPosts.postsDeleteOne);
// reviews
//router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
//router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
//router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
//router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
