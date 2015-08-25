var express = require('express');
var router = express.Router();
var logic = require('../logic/logic');
var model = require('../models/models')

var allSubs = model.allSubs
var errorArray = [];

router.get('/', function(req, res, next) {
  res.render('index', {errorArray:errorArray});
});


router.post('/submit', function(req, res, next){
  errorArray = [];
  if(allSubs.length >= 8){
    errorArray.push("Sorry! No more submissions are currently being taken.")
  }
  if(req.body.name === ""){
    errorArray.push("Please enter a name.")
  }
  if(req.body.url === ""){
    errorArray.push("Please enter a GitHub URL.")
  }
  if(req.body.image === ""){
    req.body.image = "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"
  }
  if(errorArray.length > 0){
    res.redirect('/')
  }
  else{
  var submission = new model.Submission(req.body.name, req.body.url, req.body.image)
  allSubs.push(submission);
  res.redirect('/submissions')
  }
});


router.post('/move', function(req, res, next){
  errorArray = [];
  if(allSubs.length === 0){
    errorArray.push("No current submissions.");
    res.redirect('/');
  }
  else{
    res.redirect('/submissions')
  }
});

router.post('/voteRedirect', function(req, res, next){
//divide into competing pairs
//add vote button for each

 res.redirect('/vote')
});

router.get('/submissions', function(req, res, next) {
  res.render('submissions', {allSubs:allSubs});
});

router.get('/vote', function(req, res, next) {
  res.render('vote', {allSubs:allSubs});
});










module.exports = router;
