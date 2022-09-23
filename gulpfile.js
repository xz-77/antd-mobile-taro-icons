const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const tsconfig = require('./tsconfig.json');
const rename = require('gulp-rename');

function clean() {
  return del('./lib/**');
}

// function buildStyle() {
//   return gulp
//     .src(['./src/**/*.less'], {
//       base: './src/',
//       ignore: ['**/demos/**/*', '**/tests/**/*', '**/pages/**/*', '**/app.less', '**/index.html'],
//     })
//     .pipe(
//       less({
//         paths: [path.resolve(__dirname, 'src')],
//       })
//     )
//     .pipe(gulp.dest('./lib/es'))
//     .pipe(gulp.dest('./lib/cjs'));
// }

function copyAssets() {
  return gulp
    .src(['./src/**/assets/*'], {
      ignore: ['**/demos/**/*', '**/tests/**/*', '**/pages/**/*'],
    })
    .pipe(gulp.dest('./lib/es'))
    .pipe(gulp.dest('./lib/cjs'));
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES2022',
  });
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: [
        '**/demos/**/*',
        '**/tests/**/*',
        '**/pages/**/*',
        '**/app.ts',
        '**/app.less',
        '**/app.config.ts',
        '**/index.html',
      ],
    })
    .pipe(tsProject)
    .pipe(
      babel({
        plugins: ['./babel-transform-less-to-css'],
      })
    )
    .pipe(gulp.dest('./lib/es'));
}

// function buildCJS() {
//   return gulp
//     .src(['lib/es/**/*.js'])
//     .pipe(
//       babel({
//         plugins: ['@babel/plugin-transform-modules-commonjs'],
//       })
//     )
//     .pipe(gulp.dest('lib/cjs/'));
// }

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
      ignore: ['**/demos/**/*', '**/tests/**/*', '**/pages/**/*', '**/app.ts', '**/app.config.ts', '**/index.html'],
    })
    .pipe(tsProject)
    .pipe(gulp.dest('lib/es/'))
    .pipe(gulp.dest('lib/cjs/'));
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

exports.buildIcons = gulp.series(clean, buildES, gulp.parallel(buildDeclaration), copyAssets, copyMetaFiles);
