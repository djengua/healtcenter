var ss  = require('./ChkSession');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  //res.send("respond with a resource");

  ss.validateSession(req.session.user, res, 'usuarios');

  //res.render('usuarios.jade');
};


/*
 * GET login page.
 */

exports.login = function(req, res, next) {
  res.render('login.jade');
};

/*
 * GET logout route.
 */

exports.logout = function(req, res, next) {
  console.log(' - - logout del usuario: ' + req.session.user.email);
  req.session.destroy();
  res.redirect('/');
};


/*
 * POST authenticate route.
 */

exports.authenticate = function(req, res, next) {
  if (!req.body.email || !req.body.password)
    return res.render('login', { error: "Por favor introduzca un email y password." });
  if(req.body.email === "dav_vd@hotmail.com")
  {
    if(req.body.password === 'test')
    {
    //req.collections.users.findOne({
      //email: req.body.email,
      //password: req.body.password
    //}, function(error, user){
      //if (error) return next(error);
      //if (!user) return res.render('login', {error: "Incorrect email&password combination."});
      req.session.user = {'email':"dav_vd@hotmail.com", 'name': 'dave'}; // user;
      //console.log(req.session.user);
      //req.session.admin = user.admin;
      res.redirect('/dashboard');
    }
    else{
      return res.render('login', { error: "El password es incorrecto." });
    }
  //})
  }
  else {
    res.render('login', {
      error: "El usuario no existe."
    });

  }
};
