//definiendo variables de modulos que se utilizaran
var express = require('express'),
  path = require('path'),
  routes = require('./routes'),
  http = require('http'),
  app = express();
  // Express.js Middleware
  var session = require('express-session'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

// Variables locales
//app.locals.appTitle = 'Healt Center';
//app.locals.twitter = '@dav_vd';

app.engine('html', require('jade').__express);
// Configuraciones de express.js
var port = process.env.PORT || 9027; //puerto que se va utilizar
app.set('view engine', 'jade'); //se indica que se va usar jade
app.set('views', path.join(__dirname, 'views')); //se indica el directorio de las vistas (jade)
// Configuracion de middleware de Express.js
app.use(express.static(path.join(__dirname, 'public'))); //se indica la carpeta public como un recurso statico para ver imagenes, css, y js
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
//app.use(session({secret: '2C44774A-D649-4D44-9535-46E296EF984F'}));
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));

// Authentication middleware
app.use(function(req, res, next) {
  if (req.session && req.session.admin)
    res.locals.admin = true;
next(); });
// Authorization Middleware
var authorize = function(req, res, next) {
  if (req.session && req.session.admin)
    return next();
  else
    return res.send(401);
};

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Pages & routes
app.get('/', routes.index);// pagina principal y define el user
// Paginas y rutas  de login
app.get('/login', routes.user.login); //llama al metodo login dentro de users.js
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout); //expone el methodo logout

app.get('/dashboard', function(req, res){res.render('dashboard');})

/*app.get('/admin', authorize, routes.article.admin);
app.get('/post', authorize, routes.article.post);
app.post('/post', authorize, routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);
// REST API routes
app.all('/api', authorize);
app.get('/api/articles', routes.article.list);
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.del('/api/articles/:id', routes.article.del);*/
app.all('*', function(req, res) {
  res.send(404);
})




/*
//Paginas y rutas
app.get('/', function(req, res){
  res.render('index.jade', {
    title: 'Healt Center'
  });
});

app.get('/about-us.html', function(req, res){
  res.render('header.jade', {
    title: 'About Us'
  });
});

app.get('/login.html', function(req, res){
  res.render('login.jade');
});

app.get('/contact.html', function(req, res){
  res.render('contact.jade');
});

app.get('/dashboard.html', function(req, res){
  res.render('dashboard.jade');
});

app.get('/usuarios.html', function(req, res){
  res.render('usuarios.jade');
});
*/
app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
