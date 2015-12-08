/*eslint-env node, mocha */

var atomizer = require('../')
var vfs      = require('vinyl-fs')
var fs       = require('fs')
var es       = require('event-stream')

describe('gulp-atomizer', function() {
  describe('in buffer mode', function () {
    it('should find acss classnames in html files', function (td) {

      //init our transformer
      var acss = Atomizer()

      //pipe the two test files to acss
      vfs.src(['test1.html', 'test2.html'])
        .pipe(acss)
        .pipe(es.wait(function(err, body) {

          // make sure it's the proper type
          assert(file.isStream());

          //buffer the file contents
          file.contents.pipe(es.wait(function(err, data) {

            // read the template file
            var template = fs.readFileSync('atomic.css', 'utf8')

            assert.equal(data, template)

            td()

          }))

        })

        // wait for atomic.css to come out
        acss.once('data', function(file) {
          // make sure it came out the same way it went in
          assert(file.isStream());

        // buffer the contents to make sure it got prepended to
        file.contents.pipe(es.wait(function(err, data) {
          // check the contents
          assert.equal(data, 'prependthisstreamwiththosecontents');
          done();
        }));
      });

    })
  })
})
