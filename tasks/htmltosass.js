/*
 * grunt-htmltosass
 * 
 *
 * Copyright (c) 2013 Yuri akella Artyukh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('htmltosass', 'Your task description goes here.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			punctuation: '.',
			separator: ', '
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				// Read file source.
				return grunt.file.read(filepath);
			}).join(grunt.util.normalizelf(options.separator));

			// Handle options.
			src += options.punctuation;
			//src += '-------------';
			// here goes html 2 sass conversion, magic
			// BEGIN MAGIC
			//===================================
			 //var rePattern = new RegExp(/^Subject:(.*)$/);

			//var arrMatches = strText.match(rePattern);
			var allclasses = '';
			var uniqueclasses = '';
			allclasses = src.match(/(class="([^"]+)")/g).map(function(s){return s.replace(/class="|"/g, '')}).join(' ').split(' '); //tnx Egor Lvivski for this

			uniqueclasses = allclasses.filter(function(elem, pos) {
    				return allclasses.indexOf(elem) == pos;
			});// removing duplicates

			uniqueclasses.sort();//sorting

			grunt.log.writeln(uniqueclasses); // works!

			// @todo generate SASS file based on this



			//===================================
			 // END OF MAGIC
			// Write the destination file.
			// for now jus
			grunt.file.write(f.dest, uniqueclasses);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
