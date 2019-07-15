const path = require('path');
const url = require('url');
const config = require('../config/config');
const Logger = require('../utils/logger/logger');

const { app, BrowserWindow } = require('electron');

let mainWindow


function start() {
    app.on("browser-window-created", function (e, window) {
        window.setMenu(null);
    });
    app.on("ready", () => {
        mainWindow = new BrowserWindow({
            title: 'CommandLauncher',
            //icon: path.dirname(require.main.filename) + '/app/resources/static/img/icon.ico',
            backgroundColor: "#252526",
            show: false
        });
        mainWindow.loadURL(url.format({
            protocol: 'http',
            hostname: 'localhost',
            port: config.get('PORT') ? config.get('PORT') : 3000
        }));
        mainWindow.webContents.on('did-finish-load', function () {
            setTimeout(function () {
                mainWindow.maximize()
                mainWindow.show();
            }, 40);
        });
    });
}

module.exports = {
    start: start
}