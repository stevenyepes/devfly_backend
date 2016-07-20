/*jslint node: true */
'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "default": "user",
    trim: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  },
  google:{
    id           : String,
    token        : String,
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt,1000,64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() +7);

  return jwt.sign({
    _id: this.id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiry.getTime()/1000),
  }, process.env.JWT_SECRET);
};

// Setting up roles to Users
userSchema.plugin(require('mongoose-role'), {
  roles: ['public', 'user', 'admin'],
  accessLevels: {
    'public': ['public', 'user', 'admin'],
    'anon': ['public'],
    'user': ['user', 'admin'],
    'admin': ['admin']
  }
});


mongoose.model('User', userSchema);
