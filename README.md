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

## Example with custom filename, config, and options
```js
var gulp = require('gulp');
var acss = require('gulp-atomizer');
var acssConf = require('your-conf-file.js') // this would contain your breakpoint definitions, customs, etc.

gulp.task('acss', function() {
  return gulp.src('./*.html')
    .pipe(acss('_atoms.scss', acssConf, {namespace: '#atomic', verbose: true}))
    .pipe(gulp.dest('dist'));
});
```

## Testing
Uses [Mocha](http://mochajs.org/) under the hood.
```bash
npm run test
```
