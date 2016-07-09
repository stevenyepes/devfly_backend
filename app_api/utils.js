var lwip = require('lwip');
var fileType = require('file-type');

sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.resizeImage = function(res,path, done){
  lwip.open(path, function(err, image){

    // check err
    if(err) {
      this.sendJSONResponse(res, 404, err);
      return;
    }
    // manipulate image:
    image.scale(0.5, function(err, image){
      // check err
      if(err) {
        this.sendJSONResponse(res, 404, err);
        return;
      }
      // encode to jpeg and get a buffer object:
      image.toBuffer('jpg', function(err, buffer){

        // check err...
        if(err){
          this.sendJSONResponse(res, 404, err);
          return;
        }
        // send the buffer and mimetype
        var contentType = fileType(buffer).mime;
        done(buffer, contentType);
      });

    });

  });


};

module.exports.sendJSONResponse = sendJSONResponse;
