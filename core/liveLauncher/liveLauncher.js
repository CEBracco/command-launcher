module.exports = class LiveLauncherSession {
    constructor(wsConnection) {
        this.wsConnection = wsConnection;
        this.intanceShellSession = false;
        this.start();
    }

    start() {
        
    }

    write(command) {
        // this.wsConnection.sendUTF(command);
    }

    get websocket() {
        return this.wsConnection;
    }

    get isIntanceShellSession() {
        return this.instanceShellSession;
    }
}