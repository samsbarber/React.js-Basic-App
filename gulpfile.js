// The base Gulp framework
var gulp = require('gulp');

// Cmd line tools so we know what's happening during the build process
var gutil = require('gulp-util');

// Moving text files around during the build process
var source = require('vinyl-source-stream');

// Works out what parts of code rely on others
var browserify = require('browserify');

// Automatically re-runs the Gulp build process whenver we make changes
var watchify = require('watchify');

// Works with Browserify to conver the JSX to JS
var reactify = require('reactify');

gulp.task('default', function(){

  var bundler = watchify(browserify({

    entries: ['./src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: 'true',
    cache: {},
    packageCache: {},
    fullPaths: true

  }))

  function build(file) {
    if (file) gutil.log('Recompiling ' + file);
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('main.js'))
      .pipe(gulp.dest('./'));
  };

  build()
  bundler.on('update', build)

});
