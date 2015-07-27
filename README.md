# grunt-browserstacktunnel-wrapper

> A grunt plugin around browserstacktunnel-wrapper

[![Build Status](https://travis-ci.org/luhmann/grunt-browserstacktunnel-wrapper.svg?branch=master)](https://travis-ci.org/luhmann/grunt-browserstacktunnel-wrapper)
[![Coverage Status](https://coveralls.io/repos/luhmann/grunt-licensy/badge.png)](https://coveralls.io/r/luhmann/grunt-browserstacktunnel-wrapper)
[![Dependency Status](https://david-dm.org/luhmann/grunt-licensy.svg?style=flat)](https://david-dm.org/luhmann/grunt-browserstacktunnel-wrapper)

[![NPM](https://nodei.co/npm/grunt-browserstacktunnel-wrapper.png)](https://nodei.co/npm/grunt-browserstacktunnel-wrapper/)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-browserstacktunnel-wrapper --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-browserstacktunnel-wrapper');
```

## The "browserstacktunnel-wrapper" task

### Overview
In your project's Gruntfile, the `browserstacktunnel-wrapper` task is available to use.

You can run `grunt browserstacktunnel-wrapper` standalone
Or add it to an existing task: `grunt.registerTask('test', ['clean', 'browserstacktunnel-wrapper']);`

Opening a tunnel can be either accomplished by running `browserstacktunnel-wrapper` or `browserstacktunnel-wrapper:start`. Once the tunnel is established it can be closed with `browserstacktunnel-wrapper:stop`. Furthermore, the task hooks into `grunt.fail` while it is open to automatically close the tunnel whenever a task along the way fails.

### Options

```javascript
{
  name: 'localhost',
  port: 3500,
  sslFlag: 0
}
```

## Developing & Contributing

Developing on the task alone is fairly easy just `git clone https://github.com/luhmann/grunt-browserstacktunnel-wrapper.git` then `cd grunt-browserstacktunnel-wrapper`. From there one has to link the package to itself via `npm link && npm link grunt-browserstacktunnel-wrapper` which will allow for calling `grunt dev`. Now just work the `task/webpack-dev-server.js` and check results - feel free to submit a pull-request!

## Release History
- 0.0.1 Development Version. Do not use!
- 1.0.0 Not released yet
