var mongoose = require('mongoose');
var Post = mongoose.model('Post');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST a new review, providing a postid */
/* /api/v1/posts/:postid/reviews */
module.exports.reviewsCreate = function(req, res) {
  if (req.params.postid) {
    Post
      .findById(req.params.postid)
      .select('reviews')
      .exec(
        function(err, post) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            doAddReview(req, res, post);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, post id required"
    });
  }
};


var doAddReview = function(req, res, post) {
  if (!post) {
    sendJSONresponse(res, 404, "postid not found");
  } else {
    post.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    post.save(function(err, post) {
      var thisReview;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        updateAverageRating(post._id);
        thisReview = post.reviews[post.reviews.length - 1];
        sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};

var updateAverageRating = function(postid) {
  console.log("Update rating average for", postid);
  Post
    .findById(postid)
    .select('reviews')
    .exec(
      function(err, post) {
        if (!err) {
          doSetAverageRating(post);
        }
      });
};

var doSetAverageRating = function(post) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (post.reviews && post.reviews.length > 0) {
    reviewCount = post.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + post.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    post.rating = ratingAverage;
    post.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};

module.exports.reviewsUpdateOne = function(req, res) {
  if (!req.params.postid || !req.params.reviewid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, postid and reviewid are both required"
    });
    return;
  }
  Post
    .findById(req.params.postid)
    .select('reviews')
    .exec(
      function(err, post) {
        var thisReview;
        if (!post) {
          sendJSONresponse(res, 404, {
            "message": "post id not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (post.reviews && post.reviews.length > 0) {
          thisReview = post.reviews.id(req.params.reviewid);
          if (!thisReview) {
            sendJSONresponse(res, 404, {
              "message": "reviewid not found"
            });
          } else {
            thisReview.author = req.body.author;
            thisReview.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;
            post.save(function(err, post) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                updateAverageRating(post._id);
                sendJSONresponse(res, 200, thisReview);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No review to update"
          });
        }
      }
  );
};

module.exports.reviewsReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.postid && req.params.reviewid) {
    Post
      .findById(req.params.postid)
      .select('name reviews')
      .exec(
        function(err, post) {
          console.log(post);
          var response, review;
          if (!post) {
            sendJSONresponse(res, 404, {
              "message": "postid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (post.reviews && post.reviews.length > 0) {
            review = post.reviews.id(req.params.reviewid);
            if (!review) {
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {
                post: {
                  name: post.name,
                  id: req.params.postid
                },
                review: review
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, postid and reviewid are both required"
    });
  }
};

// app.delete('/api/locations/:locationid/reviews/:reviewid'
module.exports.reviewsDeleteOne = function(req, res) {
  if (!req.params.postid || !req.params.reviewid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, postid and reviewid are both required"
    });
    return;
  }
    Post
    .findById(req.params.postid)
    .select('reviews')
    .exec(
      function(err, post) {
        if (!post) {
          sendJSONresponse(res, 404, {
            "message": "postid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (post.reviews && post.reviews.length > 0) {
          if (!post.reviews.id(req.params.reviewid)) {
            sendJSONresponse(res, 404, {
              "message": "reviewid not found"
            });
          } else {
            post.reviews.id(req.params.reviewid).remove();
            post.save(function(err) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                updateAverageRating(post._id);
                sendJSONresponse(res, 204, null);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No review to delete"
          });
        }
      }
  );
};
