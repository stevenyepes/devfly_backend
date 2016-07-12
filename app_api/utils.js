var fileType = require('file-type');
var Jimp = require('jimp');

sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

resizeImage = function(res,options, done) {

    Jimp.read(options.path, function (err, image) {
      if (err) {
        sendJSONResponse(res, 404, {
          message: "Can't open the image, be sure to send a valid type of image"
        });
        return;
      }
      image.resize(options.width, options.height)            // resize
           .quality(60)                 // set JPEG quality
           .getBuffer( Jimp.MIME_JPEG, function(err,data){
             if(err) {
               sendJSONResponse(res, 404, err);
               return;
             }
             var contentType = fileType(data).mime;
             done(data, contentType);
           } );
    });

};

module.exports.sendJSONResponse = sendJSONResponse;
module.exports.resizeImage = resizeImage;
