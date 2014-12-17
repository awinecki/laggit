var knox = require('knox');
var Slack = require('node-slack');
var git = require('git-rev');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var S3_ACCESS_KEY_ID = 'AKIAIUG6LZCOC62UEA3Q';
var S3_SECRET_ACCESS_KEY = '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';

var s3client = knox.createClient({
  key: S3_ACCESS_KEY_ID,
  secret: S3_SECRET_ACCESS_KEY,
  bucket: 'haicommits'
});

var slack = new Slack('haikode', 'ThbSB26xsZrwk7NETJNhXla3');
var repoDirname = process.cwd().split('/').pop();
var user = process.env.USER;


function bucketPath(filePath) {
  return 'https://s3-eu-west-1.amazonaws.com/haicommits/' +
    filePath;
}

function sendSlackMsg(msg) {
  slack.send({
      text: msg,
      channel: argv.channel || '#test444'
  });
}

function saveLocalPictureToAmazon(localPath) {
  fs.stat(localPath, function(err, stat){
    var filename = localPath.split('/').pop();
    var s3path = user + '/' + repoDirname + '/' + filename;
    var req = s3client.put(s3path, {
      'Content-Length': stat.size,
      'Content-Type': 'text/plain'
    });
    fs.createReadStream(localPath).pipe(req);
    req.on('response', function(res){
      sendSlackMsg(bucketPath(s3path));
    });
  });
}


// run
git.long(function (str) {
  var lastCommitSha = str.substring(0, 11);
  var ext = '.gif';
  var commitPicturePath = '/Users/' + user + '/.lolcommits/' +
    repoDirname + '/' + lastCommitSha + ext;
  saveLocalPictureToAmazon(commitPicturePath);
})
