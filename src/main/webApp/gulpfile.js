var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var karma = require('karma').server;
var protractor = require("gulp-protractor").protractor;
var fs = require('fs');
var _ = require('lodash');


var scripts = require('./app.scripts.json');

var source = {
    js: {
        main: 'app/main.js',
        src: [
            // application config
            'app.config.js',

            // application bootstrap file
            'app/main.js',

            // main module
            'app/app.js',

            // module files
            'app/**/module.js',

            // other js files [controllers, services, etc.]
            'app/**/!(module)*.js'
        ],
        tpl: 'app/**/*.tpl.html',
        
        // residency admin tpl
        raTpl: 'app/widgets/**/*.html'
    }
};

var destinations = {
    js: 'build'
};


gulp.task('build', function(){
    return es.merge.apply(null, [gulp.src(source.js.src)].concat(getTemplatesStream()))
         .pipe(ngAnnotate())
         //.pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('js', function(){
    return es.merge.apply(null, [gulp.src(source.js.src)].concat(getTemplatesStream()))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('watch', function(){
    gulp.watch(source.js.src, ['js']);
    gulp.watch(source.js.tpl, ['js']);
    gulp.watch(source.js.raTpl, ['js']);
});

gulp.task('connect', function() {
    connect.server({
        port: 8888,
        root: 'index.html'
    });
});

gulp.task('vendor', function(){
    _.forIn(scripts.chunks, function(chunkScripts, chunkName){
        var paths = [];
        chunkScripts.forEach(function(script){
            var scriptFileName = scripts.paths[script];

            if (!fs.existsSync(__dirname + '/' + scriptFileName)) {

                throw console.error('Required path doesn\'t exist: ' + __dirname + '/' + scriptFileName, script)
            }
            paths.push(scriptFileName);
        });
        gulp.src(paths)
            .pipe(concat(chunkName + '.js'))
            //.on('error', swallowError)
            .pipe(gulp.dest(destinations.js))
    })

});

gulp.task('unit', function (done) {
    karma.start({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('e2e', function(done) {
    var args = ['--baseUrl', 'http://127.0.0.1:8888'];
    gulp.src(["./tests/e2e/*.js"])
        .pipe(protractor({
            configFile: "tests/protractor.conf.js",
            args: args
        }))
        .on('error', function(e) { throw e; });
});

gulp.task('prod', ['vendor', 'build']);
gulp.task('dev', ['vendor', 'js', 'watch', 'connect']);
gulp.task('test', ['connect', 'unit', 'e2e']);
gulp.task('default', ['dev']);

var swallowError = function(error){
    console.log(error.toString());
    this.emit('end')
};

var getTemplatesStream = function () {
    return [
        gulp.src(source.js.tpl)
        .pipe(templateCache({
            root: 'app/',
            module: 'app'
        })),
        gulp.src(source.js.raTpl)
        .pipe(templateCache({
            root: 'app/widgets/',
            module: '.admin'
        }))
    ];
};