module.exports = function (grunt) {
	grunt.initConfig({
		outDir: ".tmp",
		pug: {
			compile: {
				files: {
					"<%=outDir%>/index.html": ["client/**/*.pug"]
				}
			}
		},
		esteWatch: {
			options: {
				dirs: [
					"./server/**/",
					"./client/**/"
				],
				livereload: {
					enabled: true,
					extensions: ['pug', 'ts']
				}
			},
			pug: function (filepath) {
				return ['pug']
			},
			ts: function(filepath) {
				if (filepath.indexOf("server") === 0) {
					return ["exec:tscServer"];
				}
				else {
					return ["exec:tscClient", "browserify:compile"];
				}
			}
		},
		clean: {
			client: ["./client/**/*.js", "./client/**/*.map"],
			server: ["./server/**/*.js", "./server/**/*.map"]
		},
		browserify: {
			compile: {
				files: {
					"<%=outDir%>/app.js": ["client/**/*.js"]
				}
			}
		},
		exec: {
			tscClient: 'npm run tsc-client',
			tscServer: 'npm run tsc-server'
		}
	});

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-este-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask("tsc", ["pug", "exec:tscServer", "exec:tscClient", "browserify:compile", "esteWatch"]);
};