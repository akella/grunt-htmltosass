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
			var allclasses;
			var uniqueclasses;
			var sass = '';
			allclasses = src.match(/(class="([^"]+)")/g).map(function(s){return s.replace(/class="|"/g, '')}).join(' ').split(' '); //tnx Egor Lvivski for this

			uniqueclasses = allclasses.filter(function(elem, pos) {
					return allclasses.indexOf(elem) == pos;
			});// removing duplicates

			uniqueclasses.sort();//alphabet sorting


			var currentdad, a, s;
			// @todo generate SASS file based on this
			for (var i = 0; i < uniqueclasses.length; i++) {
				s = uniqueclasses[i];
				//sass += uniqueclasses[i]+'{}\n';
				if(s.indexOf("__") != -1 || s.indexOf("_") != -1){
					if(s.indexOf("__") == -1 && s.indexOf("_") != -1){
						sass += '\t&.' + s + '{\n\t\t\n\t}\n'; // modification
					}
					else{//this is element inside block
						sass += '\t.' + s + '{\n\t\t\n\t}\n'; // element
					}
				}
				else{
					if(i!=0){a='}\n.';}
					else{a='.';}
					sass += a+s+'{\n'; // block
				}
				//Do something with modifications
			}
			sass += '}'; //last bracket
			grunt.log.writeln(sass); // works!



			//===================================
			 // END OF MAGIC
			// Write the destination file.
			// for now jus
			grunt.file.write(f.dest, sass);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
