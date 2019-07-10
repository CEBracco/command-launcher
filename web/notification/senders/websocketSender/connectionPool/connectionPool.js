global.sessions = [];
let _ = require('lodash');
var logger = require('../../../../../utils/logger/logger');
var LiveLauncherSession = require('../../../../../core/liveLauncher/liveLauncher');
var TerminalSession = require('../../../../../core/terminal/terminal');

function pushConnection(connection) {
    if (connection.protocol.toLowerCase().includes('launcher')) {
        global.sessions.push(new LiveLauncherSession(connection));
    } else {
        global.sessions.push(new TerminalSession(connection));
    }
}

function removeConnection(connection) {
    //global.sessions = _.without(global.sessions, _.find(global.sessions, { code: connection.code }));
    global.sessions = _.without(global.sessions, _.find(global.sessions, { remoteAddress: connection.remoteAddress }));
}

function getConnections(filterFunction = function(connection){ return true }) {
    return _.filter(global.sessions, filterFunction);
}

function getInstancesConnections() {
    return getConnections(function(connection) {
        return connection.isIntanceShellSession;
    })
}

function getSession(connection, filterFunction = function (connection) { return true }){
    return _.find(global.sessions, function(conn){
        return conn.websocket.protocol == connection.protocol;
    })
}

module.exports = {
    pushConnection: pushConnection,
    removeConnection: removeConnection,
    getConnections: getConnections,
    getSession:getSession
}