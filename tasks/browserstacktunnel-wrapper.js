/*
* grunt-browserstacktunnel-wrapper
* https://github.com/luhmann/grunt-browserstacktunnel-wrapper
*/
'use strict';

module.exports = function(grunt) {
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
        hooker.hook(grunt.fail, 'error', closeTunnel);
        hooker.hook(grunt.log, 'fail', closeTunnel);

        done();
      }
    });
  };

  closeTunnel = function(done) {
    grunt.log.debug('Closing tunnel...');

    _tunnel.stop(function(error) {
      hooker.unhook(grunt.fail, 'warn');
      hooker.unhook(grunt.fail, 'fatal');
      hooker.unhook(grunt.fail, 'error');
      hooker.unhook(grunt.log, 'fail');

      if (error) {
        grunt.log.errorlns('...tunnel could not be closed.');
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
      subTask = this.nameArgs.split(':');

    if (subTask.length === 1) { subTask = 'start'; }
    else { subTask = subTask[1]; }

    grunt.log.debug('Selected Sub-Task: ' + subTask);

    if (subTask === 'start') {
      done = this.async();
      openTunnel(options, done);
    } else if (subTask === 'stop') {
      done = this.async();
      closeTunnel(done);
    }
  });
};
