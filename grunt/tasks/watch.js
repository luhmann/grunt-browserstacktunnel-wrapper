/* globals module */
module.exports = {
  test: {
    files: [
      '<%= paths.src.lint %>',
      '<%= paths.test.mocha %>'
    ],
    tasks: ['test']
  }
};
