function initLiveLauncher(id) {
    Terminal.applyAddon(fit);
    var term = new Terminal();
    var ws;
    term.open(document.getElementById(id));
    runTerminal();
    initWebSocket();

    function runTerminal() {
        if (term._initialized) {
            return;
        }
        term._initialized = true;

        term.prompt = () => {
            term.write('\r\ncommand-launcher:~$ ');
        };
        term.prompt();

        term.on('key', function (key, ev) {
            const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

            if (ev.keyCode === 13) {
                term.prompt();
            } else if (ev.keyCode === 8) {
                // Do not delete the prompt
                if (term._core.buffer.x > 20) {
                    term.write('\b \b');
                }
            } else if (printable) {
                term.write(key);
                term.fit();
            }
            sendCommand(key);
        });

        term.on('paste', function (data) {
            term.write(data);
        });
    }

    function initWebSocket() {
        if ("WebSocket" in window) {
            ws = new WebSocket("ws://localhost:3000", id);

            ws.onopen = function () {
                setTab();
            };

            ws.onmessage = function (event) {
                var received_msg = event.data;
                term.write(received_msg);
            };

            ws.onclose = function () { };
        } else {
            alert("WebSocket NOT supported by your Browser!");
        }
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
}