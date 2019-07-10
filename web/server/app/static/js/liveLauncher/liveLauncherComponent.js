layout.registerComponent('liveLauncherComponent', function (container, componentState) {
    container.getElement().html(`
        <div id="launcher-${componentState.label}"></div>
        <script>
            initLiveLauncher("launcher-${componentState.label}")
        </script>
    `);
});