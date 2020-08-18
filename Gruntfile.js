module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // terser scripts/app.js -o ../../2_Build/TicTacToe/scripts/app.js -c -m --comments
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
                    '../../2_Build/TicTacToe/scripts/app.js': ['scripts/app.js']
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
                    '../../2_Build/TicTacToe/sw.js': ['sw.js']
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
                    {'../../2_Build/TicTacToe/images/2online.svg': 'images/2online.svg'},
                    {'../../2_Build/TicTacToe/images/2player.svg': 'images/2player.svg'},
                    {'../../2_Build/TicTacToe/images/4inarow.svg': 'images/4inarow.svg'},
                    {'../../2_Build/TicTacToe/images/dice.svg': 'images/dice.svg'},
                    {'../../2_Build/TicTacToe/images/easy.svg': 'images/easy.svg'},
                    {'../../2_Build/TicTacToe/images/hard.svg': 'images/hard.svg'},
                    {'../../2_Build/TicTacToe/images/icon.svg': 'images/icon.svg'},
                    {'../../2_Build/TicTacToe/images/info.svg': 'images/info.svg'},
                    {'../../2_Build/TicTacToe/images/mail.svg': 'images/mail.svg'},
                    {'../../2_Build/TicTacToe/images/medium.svg': 'images/medium.svg'},
                    {'../../2_Build/TicTacToe/images/o.svg': 'images/o.svg'},
                    {'../../2_Build/TicTacToe/images/ok.svg': 'images/ok.svg'},
                    {'../../2_Build/TicTacToe/images/puzzle.svg': 'images/puzzle.svg'},
                    {'../../2_Build/TicTacToe/images/ttt1.svg': 'images/ttt1.svg'},
                    {'../../2_Build/TicTacToe/images/ttt2.svg': 'images/ttt2.svg'},
                    {'../../2_Build/TicTacToe/images/ttt3.svg': 'images/ttt3.svg'},
                    {'../../2_Build/TicTacToe/images/ttt4.svg': 'images/ttt4.svg'},
                    {'../../2_Build/TicTacToe/images/x.svg': 'images/x.svg'}
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
                    dest: '../../2_Build/TicTacToe/images'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: "/*\n* grrd's Tic Tac Toe\n* Copyright (c) 2018 Gerard Tyedmers, grrd@gmx.net\n* Licensed under the MPL-2.0 License\n*/\n"
                },
                files: {
                    '../../2_Build/TicTacToe/styles/app.css': ['styles/app.css']
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
                    dest: '../../2_Build/TicTacToe'
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
                    {expand: true, flatten: true, src: ['../../2_Build/TicTacToe/index.html'], dest: '../../2_Build/TicTacToe/'}
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['manifest/*'], dest: '../../2_Build/TicTacToe/manifest/'},
                    {expand: true, flatten: true, src: ['images/*.ico'], dest: '../../2_Build/TicTacToe/images/'},
                    {expand: true, flatten: true, src: ['**.txt'], dest: '../../2_Build/TicTacToe/'},
                    {expand: true, flatten: true, src: ['**.md'], dest: '../../2_Build/TicTacToe/'}
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
