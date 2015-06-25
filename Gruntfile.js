module.exports = function(grunt) {

    // load all grunt tasks in package.json matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'expanded',
                lineNumbers: true
            },
            dist: {
                files: {
                    'assets/css/main.css': 'assets/sass/main.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9']
            },
            dist: {
                src: ['assets/css/*.css', '!assets/css/*.min.css']
            }
        },

        cmq: {
            options: {
                log: false
            },
            dist: {
                files: {
                    'assets/css/main.css': 'assets/css/main.css'
                }
            }
        },

        csscomb: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['assets/css/*.css', '!assets/css/*.min.css'],
                    dest: ''
                }]
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: '',
                src: ['assets/css/*.css', '!assets/css/*.min.css'],
                dest: '',
                ext: '.min.css'
            }
        },

        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: [{
                    expand: true,
                    cwd: 'assets/js/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'assets/js/',
                    ext: '.min.js'
                }]
            }
        },

        watch: {

            scripts: {
                files: ['assets/js/**/*.js'],
                tasks: ['javascript'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },

            css: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }

        }


    });

    grunt.registerTask('styles', ['sass', 'autoprefixer', 'cmq', 'csscomb', 'cssmin']);
    grunt.registerTask('javascript', ['uglify']);
    grunt.registerTask('default', ['styles', 'javascript']);

};
