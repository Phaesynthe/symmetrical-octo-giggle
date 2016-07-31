// Karma configuration
// Generated on Sun Jul 31 2016 01:25:15 GMT+0000 (UTC)

module.exports = config => {
  config.set({

    autoWatch: false,

    // start these browsers
    //browsers: ['PhantomJS', 'Firefox', 'Opera', 'Safari', 'ChromeCanary'],
    browsers: ['PhantomJS'],

    concurrency: Infinity,
    coverageReporter: {
      reporters: [
        { type: 'json', subdir: './' },
        { type: 'lcov', subdir: './' },
        { type: 'text-summary' }
      ]
    },
    colors: true,
    basePath: '../',
    exclude: [],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'dist/**/*.dist.js',
      'dist/**/*.spec.js'
    ],

    // frameworks to use
    frameworks: ['jasmine'],

    // level of logging
    logLevel: config.LOG_INFO,

    // web server port
    port: 9876,

    // preprocess matching files before serving them to the browser
    preprocessors: {
      'dist/**/*.js': ['coverage']
    },

    // test results reporter to use
    reporters: ['coverage', 'spec'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
  })
}
