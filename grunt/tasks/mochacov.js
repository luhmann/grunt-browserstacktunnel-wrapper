/* globals module */
module.exports = {
  options: {
    files: 'test/**/*.js'
  },
  html: {
    options: {
      reporter: 'html-cov',
      quiet: true,
      output: 'test/coverage.html'
    }
  },
  spec: {
    options: {
      reporter: 'spec'
    }
  },
  ci: {
    options: {
      coveralls: true
    }
  }
};
