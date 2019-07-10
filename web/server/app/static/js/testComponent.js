layout.registerComponent('testComponent', function (container, componentState) {
    container.getElement().html('<h2>' + componentState.label + '</h2>');
});