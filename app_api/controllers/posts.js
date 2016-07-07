var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');


var getAuthor = function(req, res, callback) {
  if (req.payload && req.payload.email) {
    User
    .findOne({ email : req.payload.email })
    .exec(function(err, user) {
      if (!user) {
        sendJSONresponse(res, 404, {
          "message": "User not found"
      });
      return;
    } else if (err) {
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }
      callback(req, res, user.username);
    });
  } else {
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }
};

var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST /api/v1/posts/ */
module.exports.postsCreate = function (req, res) {
  getAuthor(req, res, function (req, res, username) {
    if(!req.body.keywords || !req.body.title || !req.body.content || !req.body.category) {
      sendJSONResponse(res, 404, {
        "message": "All fields are required"
      });
      return;
    }
    Post.create({
      title: req.body.title,
      author: username,
      keywords: req.body.keywords.replace(/\s/g, "").split(","),
      content: req.body.content,
      image: req.body.image,
      category: req.body.category,

    }, function(err, post) {
      if (err) {
          sendJSONResponse(res, 204, err);
      } else {
          sendJSONResponse(res, 200, post, username);
      }
    });
  });

};

/* GET /api/v1/posts */
module.exports.postsListAll = function (req, res) {
  Post
  .find()
  .exec(function(err, posts) {
    if(!posts) {
      sendJSONResponse(res, 404, {
        "message" : "Posts is empty"
      });
      return;
    } else if (err) {
      sendJSONResponse(res, 404, err);
      return;
    }
    sendJSONResponse(res, 200, posts);
  });

};

/* GET /api/v1/posts/:postid */
module.exports.postsReadOne = function (req, res) {
if (req.params && req.params.postid) {
  Post
  .findById(req.params.postid)
  .exec(function(err, post) {
    if (!post) {
     sendJSONResponse(res, 404, {
       "message": "post id not found"
     });
     return;

    } else if (err) {

      sendJSONResponse(res, 404, err);
      return;
    }
      sendJSONResponse(res, 200, post);
    });
  } else {
      sendJSONResponse(res, 404, {
        "message": "No post id in request"
      });
    }
};

/* PUT /api/v1/posts/:postid */
module.exports.postsUpdateOne = function(req, res) {
  if (!req.params.postid) {
    sendJSONResponse(res, 404, {
      "message": "Not found, postid is required"
    });
    return;
  }
  Post
    .findById(req.params.postid)
    .select('-reviews -rating -views -date')
    .exec(
      function(err, post) {
        if (!post) {
          sendJSONResponse(res, 404, {
            "message": "post not found"
          });
          return;
        } else if (err) {
          sendJSONResponse(res, 400, err);
          return;
        }
        post.title = req.body.title;
        post.content = req.body.content;
        post.keywords = req.body.keywords.replace(/\s/g, "").split(",");
        post.category = req.body.category;
        post.image.data = fs.readFileSync(req.body.image);
        post.image.contentType = 'image/png';
        post.modified = Date.now;
        post.save(function(err, post) {
          if (err) {
            sendJSONResponse(res, 404, err);
          } else {
            sendJSONResponse(res, 200, post);
          }
        });
      }
  );
};

/* DELETE /api/posts/:postid */
module.exports.postsDeleteOne = function(req, res) {
  var postid = req.params.postid;
  if (postid) {
    Post
      .findByIdAndRemove(postid)
      .exec(
        function(err, post) {
          if (err) {
            console.log(err);
            sendJSONResponse(res, 404, err);
            return;
          }
          console.log("Post id " + postid + " deleted");
          sendJSONResponse(res, 204, null);
        }
    );
  } else {
    sendJSONResponse(res, 404, {
      "message": "No postid"
    });
  }
};
