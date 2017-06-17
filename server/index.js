var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var getGitHubUserRepos = require('./middleware/gitHubRepoGrabber');

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  // read the username
  let gitHubUser = req.body.search;

  // get the repositories for the username from github
  let repos = getGitHubUserRepos(gitHubUser);
  
  // add repository data to the db
  // redirect to /repos
});

app.get('/repos', function (req, res) {
  // get the 25 most forked repos in the database 
  // display those in a list for the user
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

