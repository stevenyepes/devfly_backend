var fileType = require('file-type');
var Jimp = require('jimp')
sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

resizeImage = function(res,options, done) {

  /*sharp(options.path)
    .resize(options.width, options.height)
    .background({r: 0, g: 0, b: 0, a: 0})
    .embed()
    .toFormat(sharp.format.webp)
    .toBuffer(function(err, outputBuffer) {
      if (err) {
        sendJSONResponse(res, 404, {
          message: "Can't open the image, be sure to send a valid type of image"
        });
        return;
      }
      // outputBuffer contains WebP image data of a 512 pixels wide and 512 pixels high
      // containing a scaled version, embedded on a transparent canvas, of input image
      // send the buffer and mimetype
      var contentType = fileType(outputBuffer).mime;
      done(outputBuffer, contentType);

    });*/
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
             var contentType = fileType(data).mime;
             done(data, contentType);
           } );
    });

};

module.exports.sendJSONResponse = sendJSONResponse;
module.exports.resizeImage = resizeImage;
