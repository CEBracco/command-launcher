var config = require('../../config/config');

module.exports = class TerminalSession {
    constructor(wsConnection) {
        this.wsConnection = wsConnection;
        this.wsprotocol = wsConnection.protocol;
        this.destination = wsConnection.protocol.toLowerCase().replace(/terminal-/,"");
        this.intanceShellSession = true;
        this.start();
    }
    
    start() {
        var readline = require('readline')
        var Client = require('ssh2').Client;
        this.sshConnection = new Client();
        var session = this;
        this.sshConnection.on('ready', function () {
            console.log('Client :: ready');
            session.sshConnection.shell(function (err, stream) {
                if (err) throw err;
                // create readline interface
                session.terminalStream = stream;
                stream.write(`clear && ssh ${session.destination}\n`, 'utf8', function(){
                    session.handleConnection(readline);
                })
            });
        }).connect({
            host: config.get('PROXY_HOST'),
            port: config.get('PROXY_PORT'),
            username: config.get('PROXY_USERNAME'),
            password: config.get('PROXY_PASSWORD') // or provide a privateKey
        });
    }
    
    handleConnection(readline, stream) {
        var session = this;
        var rl = readline.createInterface(process.stdin, process.stdout);
        this.terminalStream.on('close', function () {
            process.stdout.write('Connection closed.');
            console.log('Stream :: close');
            session.close()
        }).on('data', function (data) {
            // pause to prevent more data from coming in
            process.stdin.pause();
            process.stdout.write(data);
            process.stdin.resume();
            session.wsConnection.sendUTF(data);
        }).stderr.on('data', function (data) {
            process.stderr.write(data);
            session.wsConnection.sendUTF(data);
        });
        rl.on('line', function (d) {
            // send data to through the client to the host
            this.terminalStream.write(d.trim() + '\n');
        });
        rl.on('SIGINT', function () {
            // stop input
            process.stdin.pause();
            process.stdout.write('\nEnding session\n');
            rl.close();
            // close connection
            this.terminalStream.end('exit\n');
        });
    }

    write(command) {
        this.terminalStream.write(command);
    }
    
    get websocket() {
        return this.wsConnection;
    }

    get protocol() {
        return this.wsprotocol;
    }

    get isIntanceShellSession() {
        return this.intanceShellSession;
    }

    close() {
        if(this.wsConnection) {
            this.wsConnection.close();
        }
        if (this.sshConnection) {
            this.sshConnection.end()  
        }
    }
}