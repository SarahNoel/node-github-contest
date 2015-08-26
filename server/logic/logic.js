var model = require('../models/models')

//submit button
function submitButton (body, res, allSubs){
  errorArray = [];
  //account for only 8 submissions
  if(allSubs.length >= 8){
    errorArray.push("Sorry! No more submissions are currently being taken.")
  }
  //check for name
  if(body.name === ""){
    errorArray.push("Please enter a name.")
  }
  //check for url
  if(body.url === ""){
    errorArray.push("Please enter a GitHub URL.")
  }
  //render with errors if they exist
  if(errorArray.length > 0){
    res.redirect('/')
    return errorArray
  }
  //if no errors, make new Submission
  else{
  var submission = new model.Submission(body.name, body.url, body.image)
  allSubs.push(submission);
  res.redirect('/submissions')
  }
};


//see submissions
function seeSubmissions(res, allSubs){
  errorArray = [];
  //checks for current submissions, throws error if none
  if(allSubs.length === 0){
    errorArray.push("No current submissions.");
    res.redirect('/');
    return errorArray
  }
  else{
    res.redirect('/submissions')
  }
};

//adds votes
function tallyVotes(params, allSubs){
  var id = params.id
  for (var i = 0; i < allSubs.length; i++) {
    if (id === allSubs[i].githubID){
      allSubs[i].votes += 1;
    }
  }
}

//finds winner
function findWinner(allSubs){
  var semis = [];
  var winners = [];
  var sub1 = allSubs.splice(0, 2);
  var sub2 = allSubs.splice(0, 2);
  var sub3 = allSubs.splice(0, 2);
  var sub4 = allSubs.splice(0, 2);
  allSubs.push(sub1, sub2, sub3, sub4);
  for (var i = 0; i < allSubs.length; i++) {
    if(allSubs[i].length > 0){
      semis.push(allSubs[i]);
    }
  }
  for (var i = 0; i < semis.length; i++) {
    if(semis[i][0].votes >= semis[i][1].votes){
      winners.push(semis[i][0])
    }
    else{
      winners.push(semis[i][1])
    }
  //resets votes
  }for (var j = 0; j < winners.length; j++) {
    winners[j].votes = 0;
  }
  return winners
}

module.exports = {
  submitButton:submitButton,
  seeSubmissions:seeSubmissions,
  tallyVotes:tallyVotes,
  findWinner:findWinner,
}
