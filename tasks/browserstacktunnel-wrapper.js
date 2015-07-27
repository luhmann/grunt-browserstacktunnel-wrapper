/*
* grunt-browserstacktunnel-wrapper
* https://github.com/luhmann/grunt-browserstacktunnel-wrapper
*/

module.exports = function(grunt) {
  'use strict';

  require('global-tunnel').initialize();

  var
    BrowserStackTunnel = require('browserstacktunnel-wrapper'),
    hooker = require('hooker'),
    openTunnel,
    closeTunnel,
    // sharing this object will only work for sharing it in the same grunt call
    _tunnel = {};

  openTunnel = function(options, done) {
    grunt.log.debug('Establishing tunnel...');

    _tunnel = new BrowserStackTunnel(options);

    _tunnel.start(function(error) {
      if (error) {
        grunt.log.errorlns('...tunnel could not be established.');

        done(error);
      } else {
        grunt.log.oklns('...tunnel established successfully.');

        hooker.hook(grunt.fail, 'warn', closeTunnel);
        hooker.hook(grunt.fail, 'fatal', closeTunnel);

        done();
      }
    });
  };

  closeTunnel = function(done) {
    grunt.log.debug('Closing tunnel...');

    _tunnel.stop(function(error) {
      hooker.unhook(grunt.fail, 'warn');
      hooker.unhook(grunt.fail, 'fatal');

      if (error) {
        grunt.log.errorlns('...tunnel could be closed.');
        grunt.log.error(error);

        done(error);
      } else {
        grunt.log.oklns('...tunnel closed successfully.');

        done();
      }
    });
  };

  grunt.registerTask('browserstacktunnel-wrapper', 'Start a BrowserstackTunnel for local testing', function() {
    var
      options = this.options({
        key: '',
        hosts: [{
          name: 'localhost',
          port: 3500,
          sslFlag: 0
        }],
        verbose: false
      }),
      done,
      subTask = this.name.split(':');

    if (subTask.length === 1) { subTask = 'start'; }
    else { subTask = subTask[1]; }

    if (subTask === 'start') {
      done = this.async();
      openTunnel(options, done);
    } else if (subTask === 'stop') {
      done = this.async();
      closeTunnel(done);
    }
  });
};
