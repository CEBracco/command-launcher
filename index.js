var _ = require('lodash');
var logger = require('./utils/logger/logger');
var server = require('./web/server/server');
var interface = require('./interface/interface.js');

server.start();
if (process.versions.hasOwnProperty('electron')) {
    interface.start();
}