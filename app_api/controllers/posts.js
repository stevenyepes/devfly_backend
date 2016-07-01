var mongoose = require('mongoose');
var Post = mongoose.model('Post');


var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST /api/v1/posts/ */
module.exports.postsCreate = function (req, res) {
  Post.create({
  title: req.body.title,
  author: req.body.author,
  keywords: req.body.keywords.replace(/\s/g, "").split(","),
  content: req.body.content,
  image: req.body.image,
  category: req.body.category,

}, function(err, post) {
    if (err) {
        sendJSONResponse(res, 204, err);
    } else {
        sendJSONResponse(res, 200, post);
    }
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
