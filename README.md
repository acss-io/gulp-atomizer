# gulp-atomizer

Gulp plugin for [Atomizer](https://github.com/yahoo/atomizer).

[![npm version](https://badge.fury.io/js/gulp-atomizer.svg)](https://badge.fury.io/js/gulp-atomizer)

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
      acssConfig: require('./acssConf.js'),
      // Custom css generation options to pass to atomizer's `getCSS` function.
      // This is an undocumented feature of atomizer, so I don't test for it.
      cssOptions: {
        namespace: '#atomic'
      },
      // A hook for another undocumented feature of atomizer.  
      // You can use it to create custom ACSS 'functions'.
      // Calls `acss.addRules(options.addRules)` under the hood.
      // See the tests for an example of how to use this.
      addRules: require('./rules.js')
    }))

    .pipe(gulp.dest('dist'));
});
```

## Testing
Uses [Mocha](http://mochajs.org/) under the hood.
```bash
npm run test
```
