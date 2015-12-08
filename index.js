var through = require('through2')
// var Atomizer = require('atomizer')

// Parse text to find Atomic CSS classes
// var foundClasses = atomizer.findClassNames();

// Generate Atomizer configuration from an array of Atomic classnames
// var finalConfig = atomizer.getConfig(foundClasses, defaultConfig);

// Generate Atomic CSS from configuration
// var css = atomizer.getCss(finalConfig);

module.exports = function() {

  // var defaultConfig = {}
  // var foundClasses = []
  // var atomizer = new Atomizer()

  return through.obj(function(file, encoding, cb) {
    console.log('file: ' + file)
    console.log('encoding: ' + encoding)
    cb(null, file)
  })

}
