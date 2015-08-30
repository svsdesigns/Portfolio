module.exports = function (grunt) {

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
					'css/style.min.css': ['css/style.css'],
					'css/critical.min.css': ['css/critical.css']
				}
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				warnings: false
			},
			build: {
				files: {
					'app/lib/500px.min.js': ['500px/500px.js'],
					'app/lib/modules.min.js': ['app/modules/*']
				}
			}
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>'
			},
			all: {
				src: ['app/lib/*'],
				dest: 'app/all_script.js'
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
	grunt.registerTask('default', ['sass', 'cmq', 'cssmin', 'uglify', 'concat', 'jshint']);
	//grunt.registerTask('default', ['sass', 'cmq', 'cssmin', /*'concat',*/ 'jshint', 'uglify']);

};