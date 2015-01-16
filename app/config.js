// var Bookshelf = require('bookshelf');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectionString = process.env.APPSETTING_DB_CONNECTION_STRING || 'mongodb://localhost/shortlydb';
mongoose.connect(connectionString);

module.exports.urlsSchema = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});

module.exports.usersSchema = new Schema({
  username: String,
  password: String
});
