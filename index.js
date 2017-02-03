/* eslint-env node, gulp */

var Atomizer = require('atomizer')
var arrayUniq = require('array-uniq')
var path = require('path')
var through = require('through2')

// Parse text to find Atomic CSS classes
// var foundClasses = atomizer.findClassNames()

// Generate Atomizer configuration from an array of Atomic classnames
// var finalConfig = atomizer.getConfig(foundClasses, defaultConfig)

// Generate Atomic CSS from configuration
// var css = atomizer.getCss(finalConfig)

module.exports = function (options = {}) {
  if (typeof options === 'string') {
    options = { outfile: options }
  }

  // destructure options
  let {outfile, acssConfig, cssOptions, addRules} = options

  // default options
  outfile = outfile || 'atomic.css'
  acssConfig = acssConfig || {}

  // global variables
  var latestFile
  var latestMod
  var foundClasses = []
  var acss

  // create the file handler
  var gulpTransformer = function (file, unused, cb) {
    if (file.isNull()) {
      // nothing to do
      return cb(null, file)
    } else if (file.isStream()) {
      // file.contents is a Stream.  We don't support streams
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'))
    } else if (file.isBuffer()) {
      // lazy init the acss class
      if (!acss) {
        acss = new Atomizer()

        if (addRules) {
          acss.addRules(addRules)
        }
      }

      // generate the class names and push them into the global collector array
      var html = String(file.contents)
      var classes = acss.findClassNames(html)
      foundClasses = Array.prototype.concat(foundClasses, classes)

      // make a note of this file if it's the newer than we've seen before
      if (!latestMod || file.stat && file.stat.mtime > latestMod) {
        latestFile = file
        latestMod = file.stat && file.stat.mtime
      }

      // tell the engine we're done
      cb()
    }
  }

  var endStream = function (cb) {
    // nothing in, nothing out
    if (!latestFile || !acss) {
      return cb()
    }
    // remove duplicate classes
    var classes = arrayUniq(foundClasses)
    // merge the classes into the user's config
    var finalConfig = acss.getConfig(classes, acssConfig)
    // get the actual css
    var cssOut = acss.getCss(finalConfig, cssOptions)

    // create the output file
    // (take the metadata from most recent file)
    var atomicFile = latestFile.clone({contents: false})
    atomicFile.path = path.join(latestFile.base, outfile)
    atomicFile.contents = new Buffer(cssOut)

    // all done!
    this.push(atomicFile)
    cb()
  }

  return through.obj(gulpTransformer, endStream)
}
