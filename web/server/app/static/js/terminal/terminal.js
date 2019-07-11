function initTerminal(id) {
    Terminal.applyAddon(fit);
    Terminal.applyAddon(attach);
    var term = new Terminal();
    var line = '';
    var ws;
    var wsManualConnection = false;
    term.open(document.getElementById(id));
    runTerminal();
    

    function runTerminal() {
        if (term._initialized) {
            return;
        }
        term._initialized = true;
        
        if ("WebSocket" in window) {
            ws = new WebSocket("ws://localhost:3000", id);
            ws.onclose = function () {
                closeTab();
            };
            if (wsManualConnection) {
                doWsManualConnection();
            } else {
                term.attach(ws, true, true);
            }
            term.onLineFeed(function(){
                term.fit();
            });
        } else {
            alert("WebSocket NOT supported by your Browser!");
        }
    }

    function doWsManualConnection(){
        term.on('key', function (key, ev) {
            sendCommand(key);
        });

        term.on('paste', function (data) {
            term.write(data);
        });

        initWebSocket();
    }

    function initWebSocket() {
        ws.onopen = function () { };

        ws.onmessage = function (event) {
            var received_msg = event.data;
            term.write(received_msg);
        };
    }

    function sendCommand(key) {
        ws.send(key);
    }

    function closeTab() {
        var tabs = layout.root.contentItems[0].getItemsById(id);
        if (tabs[0]) {
            tabs[0].close();
        }
    }
}