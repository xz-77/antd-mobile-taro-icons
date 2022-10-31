const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const tsconfig = require('./tsconfig.json');
const rename = require('gulp-rename');
const pxMultiplePlugin = require('postcss-px-multiple')({ times: 2 });
const replace = require('gulp-replace');
const postcss = require('gulp-postcss');

function clean() {
  return del('./lib/**');
}

function copyIconfontCss() {
  return gulp
    .src(['./src/styles/*.{css,ttf}'], {
      ignore: ['**/demo.css'],
    })
    .pipe(gulp.dest('./lib/es/styles'));
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES2022',
  });
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/styles/**/*', '**/scripts/**/*'],
    })
    .pipe(tsProject)
    .pipe(gulp.dest('./lib/es'));
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
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/styles/**/*', '**/scripts/**/*'],
    })
    .pipe(tsProject)
    .pipe(gulp.dest('lib/es/'));
}

function cleanGh() {
  return del('./dist/gh');
}

function buildGhPage() {
  return gulp
    .src(['./src/styles/*'])
    .pipe(
      rename(function (path) {
        if (path.basename === 'demo_index') {
          path.basename = 'index';
        }
      })
    )
    .pipe(gulp.dest('./dist/gh'));
}

function build2xCSS() {
  return (
    gulp
      .src('./lib/es/styles/iconfont.css')
      // Hack fix since postcss-px-multiple ignores the `@supports` block
      .pipe(replace('@supports not (color: var(--adm-color-text))', '@media screen and (min-width: 999999px)'))
      .pipe(postcss([pxMultiplePlugin]))
      .pipe(replace('@media screen and (min-width: 999999px)', '@supports not (color: var(--adm-color-text))'))
      .pipe(
        gulp.dest('./lib/es/styles', {
          overwrite: true,
        })
      )
  );
}

exports.buildGh = gulp.series(cleanGh, buildGhPage);

exports.buildIcons = gulp.series(
  clean,
  buildES,
  gulp.parallel(buildDeclaration),
  copyIconfontCss,
  build2xCSS,
  copyMetaFiles
);
