
//exports.article = require('./article');
exports.user = require('./users');
exports.dashboard = require('./dashboard');

/*
 * GET home page.
 */

exports.index = function(req, res, next){
  //req.collections.articles.find({published: true}, {sort: {_id:-1}}).toArray(function(error, articles){
    //if (error) return next(error);
    res.render('index.jade');
  //})
};
