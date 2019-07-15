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
                        componentName: 'instancesExplorerComponent',
                        componentState: { label: 'A' }
                    },
                    {
                        type: 'component',
                        componentName: 'liveLauncherComponent',
                        componentState: { label: 'A' }
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

window.layout = new GoldenLayout(config);
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