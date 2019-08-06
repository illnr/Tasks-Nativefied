var nativefier = require('nativefier').default;
var packagejson = require('./package.json');
var fs = require('fs');
var deleteFolderRecursive = require('./src/deleteFolderRecursive');
var build = require('./src/build');


// Clean folders before start
deleteFolderRecursive('./dist/');
deleteFolderRecursive('./build/');

// Create empty dist folder
fs.mkdirSync('./dist');

// build
build();
