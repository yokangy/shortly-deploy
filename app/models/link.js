var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });
//
db.urlsSchema.methods.createCode = function(){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  return shasum.digest('hex').slice(0, 5);
  // this.code = shasum.digest('hex').slice(0, 5);
  // this.save();
};

var Link = mongoose.model('Link', db.urlsSchema);

module.exports = Link;
