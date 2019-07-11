
module.exports = class LiveLauncherSession {
    
    constructor(wsConnection) {
        this.wsConnection = wsConnection;
        this.intanceShellSession = false;
        this.wsprotocol = wsConnection.protocol;
        this.connectionPool = require('../../web/notification/senders/websocketSender/connectionPool/connectionPool');
        this.start();
    }

    start() {
        
    }

    write(command) {
        this.connectionPool.getInstancesConnections().forEach(connection => {
            connection.write(command);
        });
    }

    get websocket() {
        return this.wsConnection;
    }

    get protocol() {
        return this.wsprotocol;
    }

    get isIntanceShellSession() {
        return this.instanceShellSession;
    }

    close() {
    }
}