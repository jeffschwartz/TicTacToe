/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongoskin');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

//
app.configure('development', function(){
  app.use(express.errorHandler());
  exports.db = mongo.db('localhost:27017/tictactoe?auto_reconnect')
});

app.configure('production', function(){
  app.use(express.errorHandler());
  exports.db = mongo.db('mongodb://nodejitsu:753416f4d74da6cbe118d8b4d2c13b23@alex.mongohq.com:10094/nodejitsudb67185316669?auto_reconnect')
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
