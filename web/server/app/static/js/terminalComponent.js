layout.registerComponent('terminalComponent', function (container, componentState) {
    container.getElement().html(`
        <div id="terminal-${componentState.label}"></div>
        <script>
            initTerminal("terminal-${componentState.label}")
        </script>
    `);
});