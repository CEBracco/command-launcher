layout.registerComponent('instancesExplorerComponent', function (container, componentState) {
    container.getElement().html(`
        <button class="waves-effect waves-light btn-small right blue darken-2" style="margin-top:5px;margin-right:5px" onclick="connect()"><i class="material-icons left">flash_on</i>Conectar</button>
        <div id="instances-tree-${componentState.label}"></div>
        <script>
            initInstacesExplorer("instances-tree-${componentState.label}")
        </script>
    `);
});