layout.registerComponent('instancesExplorerComponent', function (container, componentState) {
    container.getElement().html(`
        <button class="btn-connect" onclick="connect()">Conectar</button>
        <div id="instances-tree-${componentState.label}"></div>
        <script>
            initInstacesExplorer("instances-tree-${componentState.label}")
        </script>
    `);
});
