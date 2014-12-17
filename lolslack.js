var knox = require('knox');
var argv = require('minimist')(process.argv.slice(2));
var Slack = require('node-slack');

var S3_ACCESS_KEY_ID = 'AKIAIUG6LZCOC62UEA3Q';
var S3_SECRET_ACCESS_KEY = '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';

var s3client = knox.createClient({
  key: S3_ACCESS_KEY_ID,
  secret: S3_SECRET_ACCESS_KEY,
  bucket: 'haicommits'
});

var slack = new Slack('haikode', 'ThbSB26xsZrwk7NETJNhXla3');
slack.send({
    text: url
});

argv.repo;

console.log(__dirname);
console.log(__filename);

console.log(process.argv);

// var savePhotoToAmazon = function(prefix, photoUrl) {
//   var protocol;
//   var fileKey = photoUrl.match(/.*(com|net)\/(.*)/i)[2];
//   protocol.get(photoUrl, function(res) {
//     var headers = {
//         'Content-Length': res.headers['content-length'],
//         'Content-Type': res.headers['content-type']
//     };
//     s3client.putStream(res, '/' + prefix + '/' + fileKey, headers,
//         function(err, res) {
//       // check `err`, then do `res.pipe(..)` or `res.resume()` or whatever.
//       if (err) {
//         console.log(err);
//       }
//       console.log('saved photo to s3: ' + fileKey);
//     });
//   });
// };
