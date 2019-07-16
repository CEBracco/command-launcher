var sessions = []
var connected = false;

var config = {
    content: [{
        type: 'column',
        content: [
            {
                type: 'row',
                id: 'tools',
                isClosable: false,
                content: [
                    {
                        type: 'component',
                        id: 'instancesExplorerComponent',
                        componentName: 'instancesExplorerComponent',
                        componentState: {
                            label: 'instancesExplorerComponent'
                        }
                    },
                    {
                        type: 'component',
                        id: 'liveLauncherComponent',
                        componentName: 'liveLauncherComponent',
                        componentState: {
                            label: 'liveLauncherComponent'
                        }
                    }
                ]
            },
            {
                type: 'row',
                content: [
                    {
                        type: 'stack',
                        id: 'terminalStack',
                        isClosable: false,
                        content: []
                    }
                ]
            }
        ]
    }]
};

window.layout = new GoldenLayout(config, $('#layoutContainer'));
layout.init();

function openSession(sessionId) {
    sessions.push(sessionId);
    $(document).trigger('connected');
    connected = true;
}

function closeSession(sessionId) {
    var index = sessions.indexOf(sessionId);
    if (index > -1) {
        sessions.splice(index, 1);
    }
    if (sessions.length == 0) {
        $(document).trigger('disconnected');
        connected = false;
    }
}

$(document).ready(function(){
    const myObserver = new ResizeObserver(entries => {
        layout.updateSize();
    });

    const someEl = document.querySelector('#layoutContainer');
    myObserver.observe(someEl);
})

function toggleComponent(componentId) {
    var inLayoutComponent = layout.root.getItemsById(componentId)[0]
    if (!inLayoutComponent) {
        var component = {
            type: 'component',
            id: componentId,
            componentName: componentId,
            componentState: {
                label: componentId
            }
        }
        var toolsLayout = layout.root.getItemsById('tools')[0]
        if(toolsLayout) {
            toolsLayout.addChild(component);
        }
    } else {
        var toRemove = inLayoutComponent.parent;
        toRemove.removeChild(inLayoutComponent, false);
    }
}


$(document).ready(function(){
    $('.btn-liveLauncher').click(function(){
        toggleComponent('liveLauncherComponent');
    })
    $('.btn-instancesExplorer').click(function(){
        toggleComponent('instancesExplorerComponent');
    })
})
