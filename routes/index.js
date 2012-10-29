/*
 * GET home page.
 */

var app = require('../app');

exports.index = function(req, res){
  console.log(app.db);
  res.render('index', { title: 'Express' });
};