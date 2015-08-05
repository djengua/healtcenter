var express = require('express'),
  path = require('path'),
  app = express();

app.engine('html', require('jade').__express);
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

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
/*
app.get('/platforms', function(req, res){
  res.render('platforms', {
    title: 'Platforms',
    platforms: platforms
  });
});*/
app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
