

exports.default = function(req, res, next){
  console.log(' - ' + req.session.user);
  if(typeof req.session.user === 'undefined')
  {
    res.send(404);
  }
  else {

    res.render('dashboard');
  }

};
