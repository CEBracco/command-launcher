layout.registerComponent('terminalComponent', function (container, componentState) {
    container.setTitle(componentState.label.toLowerCase().replace(/terminal-[0-9]*-/g, ""))
    container.getElement().html(`
        <div id="${componentState.label}" style="height: 100%;"></div>
        <script>
            initTerminal("${componentState.label}")
        </script>
    `);
    container.on('destroy', function(){
        $.ajax({
            url: '/closeConnection',
            contentType: 'application/json',
            data: JSON.stringify({
                protocol: `${componentState.label}`
            }),
            type: 'POST'
        });
    });
});