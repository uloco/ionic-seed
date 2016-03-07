module.exports = function (config) {
  config.set({

    basePath: '',

    files: [

      'www/bower_components/ionic/release/js/ionic.bundle.js',

      'www/app.js',
      'www/{*,components/*}/*.module.js',
      'www/{*,components/*}/*.js',
      'www/{*,components/*}/*.spec.js'
    ],
    exclude: [],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputDir: 'test_out/',
      outputFile: 'unit.xml',
      suite: 'unit'
    },

    colors: true
  });
};
