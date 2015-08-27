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


//divide up allSubs
function divideSubs(allSubs) {
  var temp = [];
  var sub1 = allSubs.splice(0, 2);
  var sub2 = allSubs.splice(0, 2);
  var sub3 = allSubs.splice(0, 2);
  var sub4 = allSubs.splice(0, 2);
  temp.push(sub1, sub2, sub3, sub4)
   for (var i = 0; i < temp.length; i++) {
    if(temp[i].length > 0){
      allSubs.push(temp[i]);
    }
  }
  return allSubs;
}


//see submissions
function checkSubLength(res, allSubs){
  errorArray = [];
  //checks for current submissions, throws error if none
  if(allSubs.length === 0){
    errorArray.push("No current submissions.");
    res.redirect('/');
    return errorArray
  }
}

//see submissions
function moveToSubmit(res, allSubs){
  errorArray = [];
  if(allSubs.length > 0) {
    res.redirect('/submissions');
    return allSubs
  }
};


//adds votes
function tallyVotes(params, allSubs){
  var id = params.id
  for (var i = 0; i < allSubs.length; i++) {
    for (var j = 0; j < 2; j++) {
      if (id === allSubs[i][j].githubID){
      allSubs[i][j].votes += 1;
      }
    }
  }
}


//finds winner
function findWinner(allSubs){
  var semis = [];
  var winners = [];
  for (var i = 0; i < allSubs.length; i++) {
    if(allSubs[i][0].votes >= allSubs[i][1].votes){
      semis.push(allSubs[i][0])
    }
    else{
      semis.push(allSubs[i][1])
    }
  // resets votes
  }for (var j = 0; j < semis.length; j++) {
    semis[j].votes = 0;
  }
  winners = divideSubs(semis);
  return winners
}


//checks for 8 submissions
function checkForEight(allSubs, res){
  errorArray = [];
  if (allSubs.length < 8){
    errorArray.push("We need eight contestants before we begin!");
    res.redirect("/submissions");
    return errorArray;
  }
}


//divides and moves
function divideAndMove(allSubs, res){
  allSubs = divideSubs(allSubs);
  res.redirect("/vote");
  return allSubs;
}



module.exports = {
  submitButton:submitButton,
  tallyVotes:tallyVotes,
  findWinner:findWinner,
  divideSubs:divideSubs,
  checkSubLength:checkSubLength,
  moveToSubmit:moveToSubmit,
  checkForEight:checkForEight,
  divideAndMove:divideAndMove,

}
