var nativefier = require('nativefier').default;
var fs = require('fs');
var packagejson = require('../package.json');

var default_options = {
    name: 'Tasks',
    targetUrl: 'https://tasks.google.com/embed/?origin=https://calendar.google.com&fullWidth=1',
    // platform: 'darwin', // defaults to the current system
    // arch: 'x64', // defaults to the current system
    version: packagejson.version,
    out: './build',
    overwrite: true,
    icon: './src/tasks_512.png',
    inject: ['./src/inject.css'],
    // asar: false, // see conceal
    // counter: false,
    // bounce: false,
    // width: 1280,
    // height: 800,
    // showMenuBar: false,
    // fastQuit: false,
    // userAgent: 'Mozilla ...', // will infer a default for your current system
    // ignoreCertificate: false,
    // ignoreGpuBlacklist: false,
    // enableEs3Apis: false,
    // insecure: false,
    // honest: false,
    // zoom: 1.0,
    // singleInstance: false,
    // clearCache: false,
    // fileDownloadOptions: {
    //   saveAs: true // always show "Save As" dialog
    // },
    // processEnvs: {
    //   "GOOGLE_API_KEY": "<your-google-api-key>"
    // }
};

var options_osx = Object.assign({}, default_options, { platform: 'osx', arch: 'x64' });
var options_win = Object.assign({}, default_options, { platform: 'windows', arch: 'x64' });
var options_linux64 = Object.assign({}, default_options, { platform: 'linux', arch: 'x64' });
var options_linux32 = Object.assign({}, default_options, { platform: 'linux', arch: 'ia32' });

/** BUILD */
var build = function () {
    
    nativefier(options_osx, function (error, appPath) {
        if (error) {
            console.error(error);
            return;
        }
        console.log('OSX App has been nativefied to', appPath);
        fs.copyFile(appPath + '/' + default_options.name + '.app',
            './dist/' + default_options.name + '.app',
            function (err) {
                if (err) throw err;
                console.log('OSX App was copied to dist.');
            });
    });

    nativefier(options_win, function (error, appPath) {
        if (error) {
            console.error(error);
            return;
        }
        console.log('Win App has been nativefied to', appPath);
        fs.copyFile(appPath + '/' + default_options.name + '.exe',
            './dist/' + default_options.name + '.exe',
            function (err) {
                if (err) throw err;
                console.log('Win App was copied to dist.');
            });
    });

    nativefier(options_linux64, function (error, appPath) {
        if (error) {
            console.error(error);
            return;
        }
        console.log('L64 App has been nativefied to', appPath);
        fs.copyFile(appPath + '/' + default_options.name.toLowerCase(),
            './dist/' + default_options.name.toLowerCase() + '_x64',
            function (err) {
                if (err) throw err;
                console.log('L64 App was copied to dist.');
            });
    });

    nativefier(options_linux32, function (error, appPath) {
        if (error) {
            console.error(error);
            return;
        }
        console.log('L32 App has been nativefied to', appPath);
        fs.copyFile(appPath + '/' + default_options.name.toLowerCase(),
            './dist/' + default_options.name.toLowerCase() + '_ia32',
            function (err) {
                if (err) throw err;
                console.log('L32 App was copied to dist.');
            });
    });
};

module.exports = build;