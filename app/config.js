// var Bookshelf = require('bookshelf');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

var connectionString = process.env.APPSETTING_DB_CONNECTION_STRING || 'mongodb://localhost/shortlydb';
mongoose.connect(connectionString);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
  module.exports.urlsSchema = new Schema({
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: Number
  });
    // db.knex.schema.createTable('urls', function (link) {
    //   link.increments('id').primary();
    //   link.string('url', 255);
    //   link.string('base_url', 255);
    //   link.string('code', 100);
    //   link.string('title', 255);
    //   link.integer('visits');
    //   link.timestamps();
    // }).then(function (table) {
    //   console.log('Created Table', table);
    // });
  // }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });
  module.exports.usersSchema = new Schema({
    username: String,
    password: String
  });

// module.exports = db;
