const webpackConfig = require("./webpack.config");

module.exports = function (grunt) {
	grunt.initConfig({
		outDir: "artifacts",
		pug: {
			compile: {
				files: {
					"<%=outDir%>/index.html": ["client/**/*.pug"]
				}
			}
		},
		express: {
			options: {
				script: "./server/app.js"
			},
			dev: {
			}
		},
		esteWatch: {
			options: {
				dirs: [
					"./server/**/",
					"./client/**/"
				],
				livereload: {
					enabled: false,
					extensions: ['pug', 'ts']
				}
			},
			pug: function (filepath) {
				return ['pug']
			},
			ts: function(filepath) {
				if (filepath.indexOf("server") === 0) {
					return ["exec:tsc"];
					// return  ["express:dev:stop", "webpack:server", "express:dev"]
				}
				else {
					return ["webpack:client"];
				}
			}
		},
		exec: {
			tsc: 'npm run tsc'
		},
		webpack: {
			server: Object.assign({}, webpackConfig.server),
			client: Object.assign({}, webpackConfig.client)
		}
	});

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-este-watch');
	grunt.loadNpmTasks('grunt-webpack');

	grunt.registerTask("tsc", ["pug", "exec:tsc", "webpack:client", "esteWatch"]);
	grunt.registerTask("serve", ["pug", "webpack:server", "webpack:client",  "express:dev", "esteWatch"]);
};