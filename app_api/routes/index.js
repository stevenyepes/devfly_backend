var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/posts');
var ctrlReviews = require('../controllers/reviews');

// locations
router.get('/posts', ctrlLocations.postsListAll);
router.post('/posts', ctrlLocations.postsCreate);
router.get('/posts/:postid', ctrlLocations.postsReadOne);
//router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
//router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);
// reviews
//router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
//router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
//router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
//router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
