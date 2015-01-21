﻿module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* <%= pkg.name %> / <%= pkg.author %> / <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		jshint: {
			all: ['Gruntfile.js'],
			options: {
				lastsemic: true,
				strict: false,
				unused: false,
				globals: {
					jQuery: true
				}
			}
		},
		sass: {
			dist: {
				files: {
					'css/style.css': 'css/scss/style.scss'
				}
			}
		},
		cmq: {
			your_target: {
				files: {
					'css': ['css/style.css']
				}
			}
		},
		cssmin: {
			add_banner: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'css/style.min.css': ['css/style.css']
				}
			}
		},
		/*concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>'
			},
			all: {
				src: [
					'scripts/vendor/jquery.debouncedresize.js',
					'scripts/vendor/jquery.easing.custom.js',
					'scripts/common.js'
				],
				dest: 'scripts/all.js'
			},
			head: {
				src: [
					'scripts/vendor/modernizr.custom.72536.js',
					'scripts/vendor/respond.min.js'
				],
				dest: 'scripts/head.js'
			}
		},*/
		uglify: {
			options: {
				banner: '<%= banner %>',
				warnings: false
			},
			build: {
				files: {
					'app/minappu.js': ['app/app_-main.js'],
					'500px/500px.min.js': ['500px/500px.js']
					//'scripts/head.min.js': ['scripts/head.js']
				}
			}
		},
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['default']
			},
			src: {
				files: [
					'scripts/common.js',
					'scripts/vendor/*.js',
					'css/scss/*.scss'],
				tasks: ['default']
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'cmq', 'cssmin', 'jshint', 'uglify']);
	//grunt.registerTask('default', ['sass', 'cmq', 'cssmin', /*'concat',*/ 'jshint', 'uglify']);

};