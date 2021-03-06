var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['production']);

function authorizedUser(req, res, next) {
  console.log(req.session);

  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

/* GET home page. */


router.get('/', function(req, res, next) {
  // if (req.session.user) {
  //   next(); // Logged In Page
  // } else {
  //   res.redirect('/'); //Not Logged In
  // }
  knex('users').where('username',req.session.user).first().then(function(records){
    console.log(records);
    res.render('index', { users: records });
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signUp');
});

router.get('/times',authorizedUser, function(req, res, next) {
  // knex('times').top('solve_time').limit(5).then(function(records){
  //   res.render('leaderBoard', { scores: records });
  res.render('index');
});

router.get('/timer', function(req, res, next) {
  knex('users').where('username',req.session.user).first().then(function(records){
    console.log(records);
    res.render('timer', { users: records });
  });
});

router.post('/time/add', function(req, res, next) {
  console.log(4);
  res.end();
});

router.get('/user',function(req,res,next) {
  res.redirect('/login');
});

router.get('/user/:id',authorizedUser, function(req, res, next) {
  knex('users').where('id', req.params.id).then(function(records){
    res.render('userDetail', { users: records });
  });
});

router.post('/user/delete',authorizedUser, function(req, res, next) {
  res.render('userDetail');
});

module.exports = router;
