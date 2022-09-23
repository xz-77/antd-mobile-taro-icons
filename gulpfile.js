const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const tsconfig = require('./tsconfig.json');
const rename = require('gulp-rename');

function clean() {
  return del('./lib/**');
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES2022',
  });
  return gulp.src(['src/iconfont/**/*.{ts,tsx}']).pipe(tsProject).pipe(gulp.dest('./lib/es'));
}

function copyMetaFiles() {
  return gulp.src(['./README.md', './LICENSE']).pipe(gulp.dest('./lib/'));
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
    declaration: true,
    emitDeclarationOnly: true,
  });
  return gulp.src(['src/iconfont/**/*.{ts,tsx}']).pipe(tsProject).pipe(gulp.dest('lib/es/'));
}

function cleanGh() {
  return del('./dist/gh');
}

function buildGhPage() {
  return gulp
    .src(['./src/styles/icon-css/*'])
    .pipe(
      rename(function (path) {
        if (path.basename === 'demo_index') {
          path.basename = 'index';
        }
      })
    )
    .pipe(gulp.dest('./dist/gh'));
}

exports.buildGh = gulp.series(cleanGh, buildGhPage);

exports.buildIcons = gulp.series(clean, buildES, gulp.parallel(buildDeclaration), copyMetaFiles);
