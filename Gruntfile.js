module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // terser scripts/app.js -o dist/scripts/app.js -c -m --comments
        terser: {
            one: {
                options: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: 'some'
                    }
                },
                files: {
                    'dist/scripts/app.js': ['scripts/app.js']
                }
            },
            two: {
                options: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: 'some'
                    }
                },
                files: {
                    'dist/sw.js': ['sw.js']
                }
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {removeUnknownsAndDefaults: false},
                    {removeViewBox: false}
                ]
            },
            dist: {
                files: [
                    {'dist/images/2online.svg': 'images/2online.svg'},
                    {'dist/images/2player.svg': 'images/2player.svg'},
                    {'dist/images/4inarow.svg': 'images/4inarow.svg'},
                    {'dist/images/dice.svg': 'images/dice.svg'},
                    {'dist/images/easy.svg': 'images/easy.svg'},
                    {'dist/images/hard.svg': 'images/hard.svg'},
                    {'dist/images/icon.svg': 'images/icon.svg'},
                    {'dist/images/info.svg': 'images/info.svg'},
                    {'dist/images/mail.svg': 'images/mail.svg'},
                    {'dist/images/medium.svg': 'images/medium.svg'},
                    {'dist/images/memo.svg': 'images/memo.svg'},
                    {'dist/images/o.svg': 'images/o.svg'},
                    {'dist/images/ok.svg': 'images/ok.svg'},
                    {'dist/images/puzzle.svg': 'images/puzzle.svg'},
                    {'dist/images/reversi.svg': 'images/reversi.svg'},
                    {'dist/images/ttt1.svg': 'images/ttt1.svg'},
                    {'dist/images/ttt2.svg': 'images/ttt2.svg'},
                    {'dist/images/ttt3.svg': 'images/ttt3.svg'},
                    {'dist/images/ttt4.svg': 'images/ttt4.svg'},
                    {'dist/images/x.svg': 'images/x.svg'}
                    ]
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: "/*\n* grrd's Tic Tac Toe\n* Copyright (c) 2018 Gerard Tyedmers, grrd@gmx.net\n* Licensed under the MPL-2.0 License\n*/\n"
                },
                files: {
                    'dist/styles/app.css': ['styles/app.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: 'index.html',
                    dest: 'dist'
                }]
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /\<\!DOCTYPE html\>/g,
                            replacement: function () {
                                return "<!DOCTYPE html>\n<!-- \n* grrd's Tic Tac Toe \n* Copyright (c) 2018 Gerard Tyedmers, grrd@gmx.net \n* Licensed under the MPL-2.0 License\n-->\n";
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/index.html'], dest: 'dist/'}
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['manifest/*'], dest: 'dist/manifest/'},
                    {expand: true, flatten: true, src: ['images/*.ico'], dest: 'dist/images/'},
                    {expand: true, flatten: true, src: ['**.txt'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['**.md'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['CNAME'], dest: 'dist/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'terser',
        'svgmin',
        'imagemin',
        'cssmin',
        'htmlmin',
        'replace',
        'copy'
    ]);
};
