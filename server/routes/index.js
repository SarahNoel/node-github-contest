var express = require('express');
var router = express.Router();
var logic = require('../logic/logic');
var model = require('../models/models')

var allSubs = model.allSubs
var errorArray;
var winners;
var winners2;
var champ;

//show home page
router.get('/', function(req, res, next) {
  res.render('index', {errorArray:errorArray});
});

//submit button
router.post('/submit', function(req, res, next){
  errorArray = logic.submitButton(req.body, res, allSubs)
});

//see submissions
router.post('/move', function(req, res, next){
  errorArray = logic.seeSubmissions(res, allSubs);
});

//renders all submissions
router.get('/submissions', function(req, res, next) {
  res.render('submissions', {allSubs:allSubs});
});

//renders round 1 voting page
router.get('/vote', function(req, res, next) {
  res.render('vote', {allSubs:allSubs})
});

//tallies votes round 1
router.post("/tallyVotes/:id", function(req, res, next){
  logic.tallyVotes(req.params, allSubs);
  res.redirect('/vote')
});

//find round 1 winner
router.post('/findWinner', function(req, res, next){
  winners = logic.findWinner(allSubs);
  res.redirect('/vote2')
});

//render round 2 of voting
router.get('/vote2', function(req, res, next){
  res.render('vote2', {allSubs:winners})
});

//tallies votes round 2
router.post("/tallyVotes2/:id", function(req, res, next){
  logic.tallyVotes(req.params, winners)
  res.redirect('/vote2')
});

//find round 2 winner
router.post('/findWinner2', function(req, res, next){
  winners2 = logic.findWinner(winners)
  res.redirect('/finalvote')
});

//render final round of voting
router.get('/finalvote', function(req, res, next){
  res.render('finalvote', {allSubs:winners2})
});

//tallies final round votes
router.post("/tallyVotes3/:id", function(req, res, next){
  logic.tallyVotes(req.params, winners2)
  res.redirect('/finalvote')
});

//find final winner
router.post('/findFinalWinner', function(req, res, next){
  champ = logic.findWinner(winners2);
  res.redirect('/champ')
});

//render champion
router.get('/champ', function(req, res, next){
  res.render('champ', {allSubs:champ})
});

//reset all submissions
router.post('/reset', function(req, res, next){
  allSubs = [];
  res.redirect('/')
});

module.exports = router;
