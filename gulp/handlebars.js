"use strict";

var path        = require('path');
var merge       = require('merge-stream');
var gulp        = require('gulp');
var bytediff    = require('gulp-bytediff');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var handlebars  = require('gulp-handlebars');
var declare     = require('gulp-declare');
var wrap        = require('gulp-wrap');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  var entries = config.entries;
  var dest = path.join(taskTarget, dirs.templates.replace(/^_/, ''));

  var handlebarsFunc = function () {
      return handlebars({
        // outputType: 'bare',
        // wrapped: true,
    });
  };

  // JST's (should always be minified)
  gulp.task('handlebars', function () {
      console.log(dest);

      // Assume all partials start with an underscore
      var partials = gulp.src(path.join(dirs.source, "**/_*.hbs"))
          .pipe(handlebars())
          .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {},
          {
              imports: {
                  processPartialName: function(filePath) {
                      filePath = filePath.replace(/\\/g, "/"); // convert fwd-slash to backslash
                      return JSON.stringify(filePath.replace('.js', ''));
                  }
              }
          })
      );

      var templates = gulp.src(path.join(dirs.source, "**/[^_]*.hbs"))
          //.pipe(newer(paths.jsCompiled + '/templates.min.js'))
          .pipe(handlebarsFunc())
          // Wrap each template function in a call to Handlebars.template
          .pipe(wrap('Handlebars.template(<%= contents %>)'))
          .pipe(declare({
            namespace: 'JST',
            processName: function (filePath) {
                var lookup = 'fema-cleanup/';
                filePath = filePath.substring((filePath.indexOf(lookup) + lookup.length), filePath.length);
                filePath = filePath.replace(/\\/g, "/"); // convert fwd-slash to backslash
                filePath = filePath.replace('app/scripts/page-builder/templates/', '');
                filePath = filePath.replace('.js', '');
                console.log(filePath);
                return filePath;
            }
        }));

      return merge(partials, templates)
          .pipe(concat('templates.min.js'))
          .pipe(bytediff.start())
          .pipe(uglify())
          .pipe(bytediff.stop())
          .pipe(gulp.dest(dest));
  });
};
