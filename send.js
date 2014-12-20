#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

var argv = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');
var fs = require('fs');
var git = require('git-rev');
var knox = require('knox');
var slack = require('node-slack');


var S3_ACCESS_KEY_ID = 'AKIAIUG6LZCOC62UEA3Q';
var S3_SECRET_ACCESS_KEY = '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';
var S3_BUCKET_NAME = 'haicommits';
var SLACK_TEAM_NAME = 'haikode';
var SLACK_TOKEN = 'ThbSB26xsZrwk7NETJNhXla3';
var SLACK_DEFAULT_CHANNEL = '#test444';
var user = process.env.USER;
var repoDirname = process.cwd().split('/').pop();

var slackClient = new slack(SLACK_TEAM_NAME, SLACK_TOKEN);
var s3client = knox.createClient({
  key: S3_ACCESS_KEY_ID,
  secret: S3_SECRET_ACCESS_KEY,
  bucket: S3_BUCKET_NAME
});

function bucketPath(filePath) {
  return 'https://s3-eu-west-1.amazonaws.com/' + S3_BUCKET_NAME + '/' +
    filePath;
}

function sendSlackMsg(msg) {
  slackClient.send({
      text: msg,
      channel: argv.channel || SLACK_DEFAULT_CHANNEL
  });
}

function saveLocalPictureToAmazon(localPath) {
  fs.stat(localPath, function(err, stat){
    if (!stat) {
      console.log(chalk.yellow(
        'Lolcommit img/gif not found for the last commit.'),
        chalk.gray('Tried ' + localPath)
      );
      return;
    }
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
});
