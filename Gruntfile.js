module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);

    grunt.loadNpmTasks('grunt-sed');

    grunt.initConfig({

        jshint: {
            options: {
                expr: true,
                es5: true,
                curly: true,
                eqeqeq: true,
                newcap: true,
                noempty: true,
                nonew: true
            },
            globals: {},
            all : ['Gruntfile.js', 'public/**/js']
        },

        // get the list of tasks
        tasks: grunt.file.readJSON('./data/tasks.json'),

        sed: {
            injectTasks : {
                path : './public/js/app/ctrl-dnd.js',
                pattern: 'TASKLIST',
                replacement: '<%= JSON.stringify(tasks) %>',
                recursive: false
            }
        }

    });
};