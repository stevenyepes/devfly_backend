var mongoose = require('mongoose');
var Post = mongoose.model('Post');


var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.postsCreate = function (req, res) {
  Post.create({
  title: req.body.title,
  author: req.body.author,
  keywords: req.body.keywords.split(","),
  content: req.body.content,
  image: req.body.image,
  category: req.category,

}, function(err, post) {
    if (err) {
        sendJsonResponse(res, 400, err);
    } else {
        sendJsonResponse(res, 201, post);
    }
  });


};


module.exports.postsListAll = function (req, res) {
  Post
  .find()
  .exec(function(err, posts) {
    if(!posts) {
      sendJsonResponse(res, 404, {
        "message" : "Posts is empty"
      });
      return;
    } else if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }
    sendJsonResponse(res, 200, posts);
  });

};

module.exports.postsReadOne = function (req, res) {
if (req.params && req.params.postid) {
  Post
  .findById(req.params.postid)
  .exec(function(err, post) {
    if (!post) {
     sendJsonResponse(res, 404, {
       "message": "post id not found"
     });
     return;

    } else if (err) {

      sendJsonResponse(res, 404, err);
      return;
    }
      sendJsonResponse(res, 200, post);
    });
  } else {
      sendJsonResponse(res, 404, {
        "message": "No post id in request"
      });
    }
};
