var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

db.urlsSchema.pre('save', function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = mongoose.model('Link', db.urlsSchema);

module.exports = Link;
