var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  var linkQuery = Link.find();
  var promise = linkQuery.exec();

  promise.addBack(function(err, links) {
    res.send(200, links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  var linkQuery = Link.find({ url: uri });
  var promise = linkQuery.exec();

  promise.addBack(function(err, links) {
    if (links.length > 0) {
      res.send(200, links[0]);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin,
          visits: 0
        });
        link.save(function(err, link) {
          res.send(200, link);
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var userQuery = User.find({ username: username });
  var promise = userQuery.exec();
  promise.addBack(function(err, user) {
    if(user.length === 0) {
      res.redirect('/login');
    } else {
      var newUser = new User({
        username: username,
        password: user[0].password
      });
      newUser.comparePassword(password, function(match) {
        if (match) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var userQuery = User.find({ username: username });
  var promise = userQuery.exec();
  promise.addBack(function(err, user) {
      if (user.length === 0) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err, newUser) {
            util.createSession(req, res, newUser);
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};

exports.navToLink = function(req, res) {
  var linkQuery = Link.find({code: req.params[0]});
  var promise = linkQuery.exec();
  promise.addBack(function(err, link) {
    if(link.length === 0) {
      res.redirect('/');
    } else {
      Link.update({ code: link[0].code}, { visits: link[0].visits + 1 }).exec();
      res.redirect(link[0].url);
    }
  });

};
