
function gitID(githubName){
  var githubID;
  var name = githubName.split(' ');
  if (name.length > 1){
    githubID = name[0] + name[1];
  }else{
    githubID = name[0]
  }
  return githubID
}

function Submission(githubName, githubURL, githubImage){
  this.votes = 0;
  this.githubName = githubName;
  this.githubURL = githubURL;
  this.githubImage = githubImage || "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png";
  this.githubID = gitID(githubName)
}


var s1 = new Submission("s1", "1");
var s2 = new Submission("s2", "2");
var s3 = new Submission("s3", "1");
var s4 = new Submission("s4", "1");
var s5 = new Submission("s5", "1");
var s6 = new Submission("s6", "1");
var s7 = new Submission("s7", "1");
var s8 = new Submission("s8", "1");

var allSubs = [];

var allSubs = [s1, s2, s3, s4, s5, s6, s7];


module.exports = {
  Submission:Submission,
  gitID:gitID,
  allSubs:allSubs

}
