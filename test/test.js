/*eslint-env node, mocha */

var atomizer = require('../')
var vfs      = require('vinyl-fs')
var fs       = require('fs')
var es       = require('event-stream')
var assert   = require('assert')

describe('gulp-atomizer', function() {
  describe('in buffer mode', function () {
    it('should find acss classnames in html files', function (td) {

      //init our transformer
      var acss = atomizer('atomic,css', {
        "custom": {
          "Bgc($primary)": "#f3f3f3"
        }
      })

      //pipe the two test files to acss
      vfs.src(['./test1.html', './test2.html'], {cwd: __dirname})
        .pipe(acss)

      acss.once('data', function(file) {
        // make sure it came out the same way it went in
        assert(file.isBuffer());

        // read the template file
        var template = fs.readFileSync(__dirname + '/atomic.css', 'utf8')

        // stringify the buffer
        var contents = file.contents.toString('utf8')

        assert.equal(contents, template, 'acss output isnt correct')

        td()
      })
    })
  })
})
