var sessions = []
var connected = false;

var config = {
    content: [{
        type: 'column',
        content: [
            {
                type: 'row',
                id: 'toolsRow',
                content: [
                    {
                        type: 'component',
                        id: 'instancesExplorerComponent',
                        componentName: 'instancesExplorerComponent',
                        componentState: { label: 'instancesExplorerComponent' }
                    },
                    {
                        type: 'component',
                        id: 'liveLauncherComponent',
                        componentName: 'liveLauncherComponent',
                        componentState: { label: 'liveLauncherComponent' }
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
    var component = {
        type: 'component',
        id: componentId,
        componentName: 'terminalComponent',
        componentState: {
            label: componentId 
        }
    }
    if (layout.root.getItemsById('toolsRow')[0]) {
        layout.root.getItemsById('toolsRow')[0].addChild(component);
    }
}
