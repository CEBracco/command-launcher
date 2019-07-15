layout.registerComponent('liveLauncherComponent', function (container, componentState) {
    container.getElement().html(`
        <div id="${componentState.label}"></div>
        <script>
            initLiveLauncher("${componentState.label}")
        </script>
    `);
    container.on('destroy', function () {
        $.ajax({
            url: '/closeConnection',
            contentType: 'application/json',
            data: JSON.stringify({
                protocol: `${componentState.label.toLowerCase()}`
            }),
            type: 'POST'
        });
    });
});