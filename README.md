# gulp-atomizer

Gulp plugin for [Atomizer](https://github.com/yahoo/atomizer).

[![npm version](https://badge.fury.io/js/gulp-atomizer.svg)](https://badge.fury.io/js/gulp-atomizer)

Warning: This is my first gulp plugin.  You may find some rough edges.  If something doesn't work right **please submit a bug report or pull request**.  I'm committed to maintaining it and making it work like any other first-class gulp plugin.

## Installation
```bash
npm install --save-dev gulp-atomizer
```

## Example
```js
var gulp = require('gulp');
var acss = require('gulp-atomizer');

gulp.task('acss', function() {
  return gulp.src('./*.html')
    .pipe(acss())
    .pipe(gulp.dest('dist'));
});
```

## Full API Example
```js
var gulp = require('gulp');
var acss = require('gulp-atomizer');

gulp.task('acss', function() {
  return gulp.src('./*.html')

    .pipe(acss({
      // the filename of your output file.
      // Default is `atomic.css`
      outfile: 'atoms.css',
      // Configuration options to pass to atomizer.
      // This will have your variables, breakpoint definitions, etc.
      // Either `require` it from a separate file or include it inline
      acssConfig: require('acssConf.js'),
      // Custom css generation options to pass to atomizer's `getCSS` function.
      // This isn't a documented feature of atomizer, but it's there for those who know what to do with it.
      cssOptions: {
        namespace: '#atomic'
      },
      // This is a hook for another undocumented feature of atomizer.  You can use it to create custom ACSS 'functions'.  Calls `acss.addRules(options.addRules)` under the hood.
      addRules: require('rules.js')
    }))

    .pipe(gulp.dest('dist'));
});
```

## Example with custom rules addition
You can add your own rules by passing in the `addRules` property in the options object. These will be concatenated after the normal set of rules. Setting rules up this way helps with the creation of theme files.
```js
// your-rules-file.js
module.exports = [{
    'type': 'helper',
    'id': 'test-helper',
    'name': 'Test Helper',
    'matcher': 'test-helper',
    'noParams': true,
    'styles': {
      'cursor': 'pointer',
      'font-size': '1.3em',
      'padding': '5px'
    }
  }, {
    'type': 'pattern',
    'id': 'test-pattern',
    'name': 'Test Pattern',
    'matcher': 'TestPattern',
    'allowParamToValue': true,
    'styles': {
      'margin': '5px 5px 10px',
      'background-color': '$0'
    }
}];
```
```js
// gulpfile.js
var gulp = require('gulp');
var acss = require('gulp-atomizer');
var acssConf = require('your-conf-file.js')
var acssRules = require('your-rules-file.js')

gulp.task('acss', function() {
  return gulp.src('./*.html')
    .pipe(acss('_atoms.scss', acssConf, {
      addRules: acssRules
    }))
    .pipe(gulp.dest('dist'));
```

## Testing
Uses [Mocha](http://mochajs.org/) under the hood.
```bash
npm run test
```
