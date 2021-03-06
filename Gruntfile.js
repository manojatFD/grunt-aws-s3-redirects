/*
 * aws-s3-redirects
 * https://github.com/manoj/sandbox
 *
 * Copyright (c) 2016 Manoj Krishnan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    //AWS Access Keys
    aws: grunt.file.readJSON('aws.json'),

    aws_s3_redirects: {
      set_redirects: {
        options: {
          files_root: "",
          redirects_json_path: "",
          sync_task_name: "",
        }
      }
    },

    //AWS S3 Object
    aws_s3: {
      options: {
        accessKeyId: "<%= aws.AWSAccessKeyId %>",
        secretAccessKey: "<%= aws.AWSSecretKey %>",
        bucket: "",
        region: "us-east-1",
        uploadConcurrency: 5,
        downloadConcurrency: 5,
        differential: true
      },
      files_sync: {
        files: []
      },
      files_cleanup: {
        files: []
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-aws-s3');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['aws_s3_redirects:set_redirects']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
