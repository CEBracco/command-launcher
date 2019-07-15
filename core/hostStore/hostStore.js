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

var lineProcessingEnabled = false;
var processingProyect;
function processLine(line) {
    line = line.trim();
    if (line == '') {
        return
    }
    if (line.match(/#\ *definitions.begin/g)) {
        lineProcessingEnabled = true
        return
    }
    if (line.match(/#\ *definitions.end/g)) {
        lineProcessingEnabled = false
        return
    }
    if (lineProcessingEnabled) {
        if (line.match(/^#\ */g)) {
            processingProyect = { name: line.replace(/#\ */g, ''), instances: [] }
            global.hosts.push(processingProyect);
        } else {
            var instanceLine = line.replace(/[\s\t]+/g, ' '); 
            processingProyect.instances.push({ name: instanceLine.split(' ')[1], ip: instanceLine.split(' ')[0] });
        }
    }
}

function getHosts() {
    return global.hosts;
}

module.exports = {
    getHosts: getHosts
}
