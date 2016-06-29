var mongoose = require( 'mongoose' );


var reviewSchema = new mongoose.Schema({
  author: String,
  rating: {type: Number, required: true, min: 0, max: 5},
  reviewText: String,
  createdOn: {type: Date, "default": Date.now}
});

var PostSchema = new mongoose.Schema({
  title: {type: String, required: true},
  keywords: {type:[String], required: true},
  author: {type: String, required: true},
  content: {type:String, required: true},
  rating: {type: Number, "default": 0, min: 0, max:5},
  date: {type:Date, "default": Date.now},
  views: Number,
  image: { data: Buffer, contentType: String },
  reviews : [reviewSchema]
});


mongoose.model('Post', PostSchema);
