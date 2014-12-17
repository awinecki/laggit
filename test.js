

var git = require('git-rev')

git.short(function (str) {
  console.log('short', str)
  // => aefdd94
})

