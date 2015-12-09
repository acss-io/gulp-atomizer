# gulp-atomizer

Gulp plugin for [Atomizer](https://github.com/yahoo/atomizer).

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

## Testing
Use [Mocha](http://mochajs.org/).
```bash
npm install -g mocha  # install globaly
mocha                 # run the tests
```
