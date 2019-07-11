layout.registerComponent('terminalComponent', function (container, componentState) {
    container.setTitle(componentState.label)
    container.getElement().html(`
        <div id="terminal-${componentState.label}"></div>
        <script>
            initTerminal("terminal-${componentState.label}")
        </script>
    `);
    container.on('destroy', function(){
        $.ajax({
            url: '/closeConnection',
            contentType: 'application/json',
            data: JSON.stringify({
                protocol: `terminal-${componentState.label}`
            }),
            type: 'POST'
        });
    });
});