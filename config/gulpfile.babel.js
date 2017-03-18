/**
 * @author ruanjq
 * @since  2017-03-01
 * @desc 
 *    gulp 自动化编译代码，es6模块化开发，提升开发效率，
 *    gulp-rollup 自动化打包代码，参考链接  https://github.com/rollup/rollup  
 *                                          http://rollupjs.org/guide/
 *                                          https://www.npmjs.com/package/gulp-rollup
 *
 * 
 */

const gulp = require('gulp');
const rollup = require('gulp-rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const fs = require('fs');
const path = require("path");
const external = Object.keys(require('../package.json').dependencies);
const multiEntry =  require('rollup-plugin-multi-entry');

const rename = require('gulp-rename'),
    mincss = require("gulp-minify-css"),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    uglify = require("gulp-uglify"),
    notify = require("gulp-notify"),
    less = require("gulp-less"),
    rev = require('gulp-rev'),
    gulpif = require('gulp-if'),
    revDel = require('rev-del'),
    clean = require('gulp-clean'),
    revCollector = require('gulp-rev-collector'),
    spritesmith = require('gulp.spritesmith');
let entrys = require('./entrys');
const condition = true;
const processors = [
    autoprefixer({
        browsers: ["last 4 versions", "Firefox >= 20", "Firefox < 20"]
    })
];

/**
 * [ rollUp 打包操作，rev 版本号配置管理 ]
 * @param  {[type]} err) {                       return 'rollup error----n错误信息：' + err;        }))        .pipe(uglify())        .pipe(rev() [description]
 * @return {[type]}      [description]
 */
gulp.task('rollup',['clean-revJs'], () => {
    return gulp.src('../src/js/**/*.js')
        .pipe(rollup({
            // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
            // amd – 使用像requirejs一样的模块定义
            // cjs – CommonJS，适用于node和browserify / Webpack
            // es6 (default) – 保持ES6的格式
            // iife – 使用于<script> 标签引用的方式
            // umd – 适用于CommonJs和AMD风格通用模式
            entry:entrys.entrys,
            format: 'umd',
            plugins: [
                // multiEntry({exports: false }),
                commonjs(),
                nodeResolve({ jsnext: true }),
                babel({
                    exclude: 'node_modules/**/*'
                })
            ]
        }))
        .on("error",notify.onError(function (err) {
            return 'rollup error----\n错误信息：' + err;
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('../dist/js'))
        .pipe(rev.manifest('../rev-manifest-js.json'))
        .pipe(gulp.dest('../dist/js'));

});


/**
 * [ less 编译。rev 版本号映射 ]
 * @param  {[type]} done) {               gulp.src(path.resolve(__dirname, '../src/styleSheet/less*.less'))        .pipe(less())        .on("error",notify.onError(function (err) {            return 'Less error----n错误信息：' + err;        }))        .pipe(postcss(processors))        .pipe(mincss())        .pipe(rev())          .pipe(gulp.dest('../dist/styleSheet'))        .pipe(rev.manifest('../rev-manifest-css.json'))        .pipe(gulp.dest('../dist/styleSheet'));  } [description]
 * @return {[type]}       [description]
 */
gulp.task('less', ['clean-revCss'], function(done) {
    return gulp.src(path.resolve(__dirname, '../src/styleSheet/less/**/*.less'))
        .pipe(less())
        .on("error",notify.onError(function (err) {
            return 'Less error----\n错误信息：' + err;
        }))
        .pipe(postcss(processors))
        .pipe(mincss())
        .pipe(rev())  //文件名加MD5后缀
        .pipe(gulp.dest('../dist/styleSheet'))
        .pipe(rev.manifest('../rev-manifest-css.json'))
        .pipe(gulp.dest('../dist/styleSheet'));

    done();
  
});




/**
 * [ HTML 模板文件生成版本号 css ]
 * @param  {[type]} ) {               gulp.src(['../dist/*.json', '../index.html'])        .pipe(revCollector({            replaceReved: true         }))        .pipe(gulp.dest('../'));    gulp.src(['../dist*.html'])        .pipe(revCollector({            replaceReved: true         }))        .pipe(gulp.dest('../src/templates/'));    } [description]
 * @return {[type]}   [description]
 */
gulp.task('revCss',['less'], function () {
    gulp.src(['../dist/*.json', '../index.html'])
        .pipe(revCollector({
            replaceReved: true
         }))
        .pipe(gulp.dest('../'));

    return gulp.src(['../dist/*.json', '../src/templates/**/*.html'])
        .pipe(revCollector({
            replaceReved: true
         }))
        .pipe(gulp.dest('../src/templates/'));    
});


/**
 * [ HTML 模板文件生成版本号 js ]
 * @param  {[type]} ) {               gulp.src(['../dist/*.json', '../index.html'])        .pipe(revCollector({            replaceReved: true         }))        .pipe(gulp.dest('../'));    gulp.src(['../dist*.html'])        .pipe(revCollector({            replaceReved: true         }))        .pipe(gulp.dest('../src/templates/'));    } [description]
 * @return {[type]}   [description]
 */
gulp.task('revJs',['rollup'], function () {
    gulp.src(['../dist/*.json', '../index.html'])
        .pipe(revCollector({
            replaceReved: true
         }))
        .pipe(gulp.dest('../'));


    return gulp.src(['../dist/*.json', '../src/templates/**/*.html'])
        .pipe(revCollector({
            replaceReved: true
         }))
        .pipe(gulp.dest('../src/templates/'));    
});


/**
 * [ 每次编译都生成新的文件，所以这里做删除操作 ]
 * @param  {[type]} ) {             return gulp.src('../dist/js*.js', {read: true})    .pipe(clean({force:true}));} [description]
 * @return {[type]}   [description]
 */
gulp.task('clean-revJs', function () {
  return gulp.src('../dist/js/**/*.js', {read: true})
    .pipe(clean({force:true}));
});

gulp.task('clean-revCss', function () {
  return gulp.src('../dist/styleSheet/**/*.css', {read: true})
    .pipe(clean({force:true}));
});


gulp.task('sprite', function (done) {
    return gulp.src(path.resolve(__dirname, '../src/images/icon/*.png'))
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.less',
            imgPath: '../../src/styleSheet/less/sprite.png'
        }))
        .on("error",notify.onError(function (err) {
            return 'sprite error----\n错误信息：'+err;
        }))
        .pipe(gulp.dest(path.resolve(__dirname, '../src/styleSheet/less')));
    done();
});



gulp.task('watchJS', function() {
    return gulp.watch('../src/js/**',['revJs']);
});

gulp.task('watchSprite', function() {
    return gulp.watch('../src/images/icon/**',['sprite']);
});

gulp.task('watchLess', function() {
    return gulp.watch('../src/styleSheet/**',['revCss']);
});


gulp.task('watch', ['watchJS','watchSprite','watchLess']);

gulp.task('default', ['revJs','sprite','revCss']);