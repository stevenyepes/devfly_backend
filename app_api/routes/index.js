var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/posts');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = express.Router();
/* Configure jwt module for routes */
var jwt = require('express-jwt');

// Just for testing
var Post = mongoose.model('Post');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});



var hasAccess = function(accessLevel) {
  return function (req, res, next) {
    var userValidate;
    if (req.payload && req.payload.email ) {//&& req.session.user.hasAccess(accessLevel)) {
      User
      .findOne({ email : req.payload.email })
      .exec(function(err, user) {
        if (!user) {

          return res.json({
            success: false,
            error: 'cant find the user'
          });
      } else if (err) {
        console.log(err);
        return res.json({
          success: false,
          error: err
        });

      }

      if(user.hasAccess(accessLevel)){
        console.log('Tengo permiso');
        return next();
      }else {
        return res.json({
          success: false,
          error: 'Unauthorized'
        });
      }

      });

    } else {
      return res.json({
        success: false,
        error: 'Unauthorized'
      });
    }

  };
};

// posts
router.get('/posts', ctrlPosts.postsListAll);
router.post('/posts', auth, hasAccess('admin'),ctrlPosts.postsCreate);
router.get('/posts/:postid', ctrlPosts.postsReadOne);
router.get('/posts/category/:category', ctrlPosts.postsByCategory);
router.put('/posts/:postid', auth,ctrlPosts.postsUpdateOne);
router.delete('/posts/:postid', auth,ctrlPosts.postsDeleteOne);
// reviews
router.post('/posts/:postid/reviews', auth,ctrlReviews.reviewsCreate);
router.get('/posts/:postid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/posts/:postid/reviews/:reviewid', auth,ctrlReviews.reviewsUpdateOne);
router.delete('/posts/:postid/reviews/:reviewid', auth,ctrlReviews.reviewsDeleteOne);
// Auth
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


// Test router
router.get('/image/:postid', function (req, res) {
  Post
  .findById(req.params.postid)
  .select('image')
  .exec(function(err,post) {
    if(err){
      console.log(err);
    }else {
      console.log(post);
      res.contentType(post.image.contentType);
      res.send(post.image.data);
    }

  });


});

module.exports = router;
