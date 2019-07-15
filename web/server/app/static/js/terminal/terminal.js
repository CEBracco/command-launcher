function initTerminal(id) {
    Terminal.applyAddon(fit);
    Terminal.applyAddon(attach);
    var term = new Terminal();
    var ws;
    var wsManualConnection = false;
    term.open(document.getElementById(id));
    runTerminal();
    

    function runTerminal() {
        if (term._initialized) {
            return;
        }
        term._initialized = true;
        
        setTab();
        
        if ("WebSocket" in window) {
            ws = new WebSocket("ws://localhost:3000", id);
            ws.onopen = function () {
                openSession(id);
            };
            ws.onclose = function () {
                // deselectInstance(id.toLowerCase().replace(/terminal-[0-9]*-/g, ""));
                closeSession(id);
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

    function getTab() {
        return layout.root.contentItems[0].getItemsById(id)[0];
    }

    function setTab() {
        var tab = getTab();
        tab.container.on('shown', function () {
            term.fit();
        });
        tab.container.on('resize', function () {
            term.fit();
        });
        $('#' + id).closest('.lm_content').css('background-color', 'black');
    }

    function closeTab() {
        if (getTab()) {
            getTab().close();
        }
    }
}