var config = require('../../config/config');
var readline = require('readline');
var Client = require('ssh2').Client;
global.hosts = [];

function init() {
    var conn = new Client();
    conn.on('ready', function () {
        conn.sftp(function (err, sftp) {
            if (err) throw err;
            var fileStream = sftp.createReadStream('/etc/hosts', { encoding: 'utf8' });

            var rl = readline.createInterface({
                input: fileStream
            });

            rl.on('line', function (line) {
                processLine(line);
            });

            fileStream.on('end', () => {
                conn.end();
            });
        });
    }).connect({
        host: config.get('PROXY_HOST'),
        port: config.get('PROXY_PORT'),
        username: config.get('PROXY_USERNAME'),
        password: config.get('PROXY_PASSWORD')
    });
}
init();

function processLine(line) {
    line = line.trim();
    if (line != '') {
        console.log(line);
    }
}

function getHosts() {
    return global.hosts;
}

module.exports = {
    getHosts = getHosts
}
