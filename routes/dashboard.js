var ss  = require('./ChkSession');

exports.default = function(req, res, next){
  //console.log(' - ' + req.session.user);
  ss.validateSession(req.session.user, res, 'dashboard');


};
