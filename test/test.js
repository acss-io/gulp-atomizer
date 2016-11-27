/*eslint-env node, mocha */

var atomizer = require('../')
var vfs      = require('vinyl-fs')
var fs       = require('fs')
var assert   = require('assert')
const path   = require('path')

const testAcss = ({options, inputFiles, outputName, outputTpl}) => {
  return new Promise(resolve => {

    outputName = outputName || 'atomic.css'

    //init our transformer
    const acss = atomizer(options)

    //pipe the two test files to acss
    vfs.src(inputFiles, {cwd: __dirname})
      .pipe(acss)

    acss.once('data', file => {
      // make sure it came out the same way it went in
      assert(file.isBuffer())

      // stringify the output file's buffer
      var contents = file.contents.toString('utf8')

      // read the template file
      var template = fs.readFileSync(path.join(__dirname, outputTpl), 'utf8')

      assert.equal(file.path, path.join(__dirname, outputName), 'acss didnt output correct path')
      assert.equal(contents, template, 'acss output isnt correct')

      resolve()
    })
  })
}

describe('gulp-atomizer', () => {
  describe('in buffer mode', () => {

    it('should find acss classnames in html files with no arguments', () => {
      return testAcss({
        inputFiles: ['basic1.html', 'basic2.html'],
        outputTpl: 'basic.css'
      })
    })

    it('should allow a custom output file name', () => {
      return testAcss({
        options: {
          outfile: 'test.css'
        },
        inputFiles: ['basic1.html', 'basic2.html'],
        outputName: 'test.css',
        outputTpl: 'basic.css'
      })
    })

    it('should pass configuration along to atomizer', () => {
      return testAcss({
        options: {
          acssConfig: {
            'custom': {
              'primary': '#f3f3f3'
            }
          }
        },
        inputFiles: ['variable.html'],
        outputTpl: 'variable.css'
      })
    })

    it('should allow the addition of new custom rules', () => {
      return testAcss({
        options: {
          addRules: [
            {
              'type': 'helper',
              'id': 'test-helper',
              'name': 'Test Helper',
              'matcher': 'test-helper',
              'noParams': true,
              'styles': {
                'cursor': 'pointer'
              }
            },
            {
              'type': 'pattern',
              'id': 'test-pattern',
              'name': 'Test Pattern',
              'matcher': 'TestPattern',
              'allowParamToValue': false,
              'styles': {
                'background-repeat': '$0'
              },
              'arguments': [{
                'n': 'no-repeat'
              }]
            }
          ]
        },
        inputFiles: ['customRules.html'],
        outputTpl: 'customRules.css'
      })
    })

  })
})
