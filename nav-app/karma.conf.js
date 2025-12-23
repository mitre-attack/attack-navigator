// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// Workaround: On newer Node versions Karma sometimes calls server.close()
// after the server is already shut down, which throws ERR_SERVER_NOT_RUNNING.
// Ignore *only* that error so tests can exit cleanly when they all passed.
process.on('uncaughtException', (err) => {
  if (err && (err.code === 'ERR_SERVER_NOT_RUNNING' || ('' + err).includes('ERR_SERVER_NOT_RUNNING'))) {
    return;
  }
  throw err;
});

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            // require('karma-coverage-istanbul-reporter'),
            require('karma-jasmine'),
            require('karma-jasmine-html-reporter'),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, 'coverage'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true,
        },

        reporters: ['progress', 'kjhtml', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessCI'],
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },
        singleRun: false,
        webpack: { node: { fs: 'empty' } }, // https://github.com/angular/angular-cli/issues/8357

        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            subdir: 'chrome',
            file: 'index.html',
        },
    });
};
