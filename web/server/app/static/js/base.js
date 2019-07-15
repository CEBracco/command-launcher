var sessions = []

var config = {
    content: [{
        type: 'column',
        content: [
            {
                type: 'row',
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
}

function closeSession(sessionId) {
    var index = sessions.indexOf(sessionId);
    if (index > -1) {
        sessions.splice(index, 1);
    }
    if (sessions.length == 0) {
        $(document).trigger('disconnected');
    }
}