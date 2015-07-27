/*
* grunt-browserstacktunnel-wrapper
* https://github.com/luhmann/grunt-browserstacktunnel-wrapper
*/

module.exports = function(grunt) {
  'use strict';

  require('global-tunnel').initialize();

  var
    BrowserStackTunnel = require('browserstacktunnel-wrapper'),
    // sharing this object will only work for sharing it in the same grunt call
    _tunnel = {};

  grunt.registerTask('browserstacktunnel-wrapper', 'Start a BrowserstackTunnel for local testing', function() {
    var options = this.options({
        key: '',
        hosts: [
            {
              name: 'localhost',
              port: 3500,
              sslFlag: 0
            }
        ],
        verbose: false
      }),
      done = this.async();

    _tunnel = new BrowserStackTunnel(options);

    grunt.log.debug('Establishing tunnel')
    _tunnel.start(function(error) {
      if (error) {
        grunt.log.errorlns('Tunnel could not be started');
        done(error);
      } else {
        grunt.log.oklns('BrowserStackLocalTunnel established');
        done();
      }
    });
  });

  grunt.registerTask('browserstacktunnel-wrapper:stop', 'Stop the Browserstacktunnel', function() {
    var done = this.async();
    _tunnel.stop(function(error) {
      if (error) {
        grunt.log.errorlns('Tunnel could not be started');
        grunt.log.error(error);
        done(error);
      } else {
        grunt.log.oklns('BrowserStackLocalTunnel closed');
        done();
      }
    });
  });
};
