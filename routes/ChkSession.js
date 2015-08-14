
exports.validateSession = function(s, res, route){

  if(typeof s === 'undefined')
  {
    res.send(404);
  }
  else {
    res.render(route);
  }

};
