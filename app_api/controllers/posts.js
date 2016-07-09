var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var utils = require('../utils.js');

var getAuthor = function(req, res, callback) {
  if (req.payload && req.payload.email) {
    User
    .findOne({ email : req.payload.email })
    .exec(function(err, user) {
      if (!user) {
        utils.sendJSONResponse(res, 404, {
          "message": "User not found"
      });
      return;
    } else if (err) {
      console.log(err);
      utils.sendJSONResponse(res, 404, err);
      return;
    }
      callback(req, res, user.username);
    });
  } else {
    utils.sendJSONResponse(res, 404, {
      "message": "User not found"
    });
    return;
  }
};

/* POST /api/v1/posts/ */
module.exports.postsCreate = function (req, res) {
  getAuthor(req, res, function (req, res, username) {
    if(!req.body.keywords || !req.body.title || !req.body.content || !req.body.category) {
      utils.sendJSONResponse(res, 404, {
        "message": "All fields are required"
      });
      return;
    }
    if(req.body.image){
      utils.resizeImage(res,req.body.image,function(buffer, contentType){
        Post.create({
          title: req.body.title,
          author: username,
          keywords: req.body.keywords.replace(/\s/g, "").split(","),
          content: req.body.content,
          category: req.body.category.replace(/\s/g, ""),
          image: {data:buffer, contentType: contentType}


        }, function(err, post) {
          if (err) {
              utils.sendJSONResponse(res, 204, err);
          } else {
              utils.sendJSONResponse(res, 200, post);
          }
        });

      });

    }else{
      Post.create({
        title: req.body.title,
        author: username,
        keywords: req.body.keywords.replace(/\s/g, "").split(","),
        content: req.body.content,
        category: req.body.category.replace(/\s/g, ""),

      }, function(err, post) {
        if (err) {
            utils.sendJSONResponse(res, 204, err);
        } else {
            utils.sendJSONResponse(res, 200, post);
        }
      });
    }
  });

};

/* GET /api/v1/posts */
module.exports.postsListAll = function (req, res) {
  console.log('postsListAll');
  Post
  .find()
  .select('-image -content -reviews -rating -keywords -modified')
  .exec(function(err, posts) {
    if(!posts || posts.length === 0) {
      utils.sendJSONResponse(res, 404, {
        "message" : "There is no post yet"
      });
      return;
    } else if (err) {
      console.log('SALTO ERROR');
      utils.sendJSONResponse(res, 404, err);
      return;
    }
    utils.sendJSONResponse(res, 200, posts);
  });

};

/* GET /api/v1/posts/:postid */
module.exports.postsReadOne = function (req, res) {
if (req.params && req.params.postid) {
  Post
  .findById(req.params.postid)
  .select('-content')
  .exec(function(err, post) {
    if (!post) {
     utils.sendJSONResponse(res, 404, {
       "message": "post id not found"
     });
     return;

    } else if (err) {

      utils.sendJSONResponse(res, 404, err);
      return;
    }
      utils.sendJSONResponse(res, 200, post);
    });
  } else {
      utils.sendJSONResponse(res, 404, {
        "message": "No post id in request"
      });
    }
};

/* PUT /api/v1/posts/:postid */
module.exports.postsUpdateOne = function(req, res) {
  if (!req.params.postid) {
    utils.sendJSONResponse(res, 404, {
      "message": "Not found, postid is required"
    });
    return;
  }

  if(!req.body.keywords) {
    utils.sendJSONResponse(res, 404, {
      message: "please send the keywords back"
    });
    return;
  }

  if(req.body.image){

    utils.resizeImage(res,req.body.image,function (buffer, contentType) {
      Post
        .findById(req.params.postid)
        .select('-reviews -rating -views -date')
        .exec(
          function(err, post) {
            if (!post) {
              utils.sendJSONResponse(res, 404, {
                "message": "post not found"
              });
              return;
            } else if (err) {
              utils.sendJSONResponse(res, 400, err);
              return;
            }
            post.title = req.body.title;
            post.content = req.body.content;
            post.keywords = req.body.keywords.replace(/\s/g, "").split(",");
            post.category = req.body.category.replace(/\s/g, "");
            post.image.data = buffer;
            post.image.contentType = contentType;
            post.modified = new Date();
            post.save(function(err, post) {
              if (err) {
                utils.sendJSONResponse(res, 404, err);
              } else {
                utils.sendJSONResponse(res, 200, post);
              }
            });
          }
      );
    });
  } else {
    Post
      .findById(req.params.postid)
      .select('-reviews -rating -views -date')
      .exec(
        function(err, post) {
          if (!post) {
            utils.sendJSONResponse(res, 404, {
              "message": "post not found"
            });
            return;
          } else if (err) {
            utils.sendJSONResponse(res, 400, err);
            return;
          }
          post.title = req.body.title;
          post.content = req.body.content;
          post.keywords = req.body.keywords.replace(/\s/g, "").split(",");
          post.category = req.body.category.replace(/\s/g, "");
          post.modified = new Date();
          post.save(function(err, post) {
            if (err) {
              utils.sendJSONResponse(res, 404, err);
            } else {
              utils.sendJSONResponse(res, 200, post);
            }
          });
        }
    );
  }

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
            utils.sendJSONResponse(res, 404, err);
            return;
          }
          console.log("Post id " + postid + " deleted");
          utils.sendJSONResponse(res, 204, null);
        }
    );
  } else {
    utils.sendJSONResponse(res, 404, {
      "message": "No postid"
    });
  }
};
