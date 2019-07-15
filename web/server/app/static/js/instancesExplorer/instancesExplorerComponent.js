layout.registerComponent('instancesExplorerComponent', function (container, componentState) {
    container.getElement().html(`
        <button class="waves-effect waves-light btn-small right blue darken-2 btn-connect" style="margin-top:5px;margin-right:5px" onclick="connectSelected()"><i class="material-icons left">flash_on</i>Conectar</button>
        <button class="waves-effect waves-light btn-small right grey lighten-3 black-text btn-disconnect hide" style="margin-top:5px;margin-right:5px" onclick="disconnectAll()"><i class="material-icons left">flash_off</i>Desconectar</button>
        <div id="instances-tree-${componentState.label}" class="instances-tree"></div>
        <script>
            initInstacesExplorer("instances-tree-${componentState.label}")
        </script>
    `);
});