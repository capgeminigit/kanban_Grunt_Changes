module.exports = function(config){
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath : './',

        // list of files / patterns to load in the browser
        files : [

            'public/Tests/libs/angular.js',
            'public/Tests/libs/angular-*.js',
            'public/Tests/libs/jquery-1.8.1.min.js',
            'public/js/app/*.js',
            'public/js/*.js',
            'public/Tests/testDnD.js'
        ],

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    })
}
