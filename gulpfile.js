var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sh = require('shelljs');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var flow = require('gulp-flowtype');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  sass: ['./scss/**/*.scss'],
  jsfiles: ['app/**/*.js'],
  noJs: [
    'app/**/*',
    '!app/**/*.js',
    'package.json'
  ]
};

/*                                                      */
/* ==================== WATCH TASK ==================== */
/*                                                      */

gulp.task('w-convert', function () {
  gulp.run('babelEs6');
  gulp.run('copy-files');

  gulp.watch(paths.noJs,['copy-files']);

  var watcher = gulp.watch(paths.jsfiles, ['babelEs6']);
  watcher.on('change', function (event) {
    gutil.log(' ' + event.type.toUpperCase(), ' ➽', gutil.colors.cyan(event.path));
  });
});

/*                                                     */
/* ==================== COPY TASK ==================== */
/*                                                     */

gulp.task('copy-files', function () {
  return gulp.src(paths.noJs)
    .pipe(changed('www'))
    .pipe(gulp.dest('www'))
});


/*                                                 */
/* ==================== Babel ==================== */
/*                                                 */

gulp.task('w-babel', function () {
  gulp.watch(paths.jsfiles, ['babelEs6']);
});

gulp.task('babelEs6', function () {
  return gulp.src(paths.jsfiles)
    .pipe(changed('./www'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.', {sourceRoot: './app'}))
    .pipe(gulp.dest('./www'));
});

/*                                                  */
/*==================== Flowtype ====================*/
/*                                                  */

gulp.task('typecheck', function () {
  return gulp.src(paths.jsfiles)
    .pipe(plumber())
    .pipe(flow({all: true}));
});

/*                                                */
/*==================== ESLint ====================*/
/*                                                */

gulp.task('w-eslint', function () {
  gulp.watch(['www/*.js', 'www/view/*.js'], ['lint']);
});

gulp.task('lint', function () {
  return gulp.src(['www/*.js', 'www/view/*.js'], {base: './'})
    .pipe(eslint({
      config: '.eslintrc'
    }))
    .pipe(eslint.format());
});

/*                                              */
/*==================== SASS ====================*/
/*                                              */

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(rename({basename: 'app.ionic', extname: '.css'}))
    .pipe(gulp.dest('./www/components/assets/styles/'))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
});

/*                                                 */
/*==================== INSTALL ====================*/
/*                                                 */

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

/*                                               */
/* ==================== GIT ==================== */
/*                                               */

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:',
      gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') +
      '\' again.'
    );
    process.exit(1);
  }
  done();
});
