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