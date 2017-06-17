var request = require('request');
var GITHUB_TOKEN = require('./token');
var Repo = require('./../../database/index.js');
var Promise = require('bluebird');

var getGitHubUserRepos = function(user) {
  var options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'michaeljclausen',
      'Authorization': `token ${GITHUB_TOKEN}`  
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received  
        resolve(JSON.parse(body));
      }
    });
  })
  .then(body => {
    var repos = [];
    body.forEach(({id, name, forks, owner, description}) => {
      var obj = { 
            id: id,
            name: name,
            forks: forks,
            ownerLogin: owner.login,
            avatarUrl: owner.avatar_url,
            description: description
          };
      repos.push(obj);
      //console.log(repos);
    });
    return repos;
  })
  .then(repos => {
    //console.log(repos);
    repos.forEach(repo => {
      new Repo(repo).save((err, repo) => {
        console.log(repo);
      });
    });
  });
    // .catch(err => {
    //   console.log('This is an error Rueben', err);
    // });
   

  

  // request(options, function (error, response, body) {
  //   console.log(body, 'body!');
  //   if (error) {
  //     console.log('error:', error); // Print the error if one occurred 
  //   } else {
  //     //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received  
  //     return Promise.resolve(1)
  //     .then(() => {
  //       let parsedBody = JSON.parse(body);
  //       parsedBody.forEach(({id, name, forks, owner, description}) => {
  //         var obj = { 
  //           id: id,
  //           name: name,
  //           forks: forks,
  //           ownerLogin: owner.login,
  //           avatarUrl: owner.avatar_url,
  //           description: description
  //         };
  //         repos.push(obj);
  //       });
  //     })
  //     .then(() => {
  //       console.log(repos, '!!!');
  //       return repos;
  //     })
  //   }
  // });
  
}

module.exports = getGitHubUserRepos;