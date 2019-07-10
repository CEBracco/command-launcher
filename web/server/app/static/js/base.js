var config = {
    content: [{
        type: 'column',
        content: [
            {
                type: 'row',
                content: [
                    {
                        type: 'component',
                        componentName: 'testComponent',
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
                        content: [
                            {
                                type: 'component',
                                componentName: 'terminalComponent',
                                componentState: { label: 'laplata' }
                            }, {
                                type: 'component',
                                componentName: 'terminalComponent',
                                componentState: { label: 'bariloche' }
                            }
                        ]
                    }
                ]
            }
        ]
    }]
};

window.layout = new GoldenLayout(config);
layout.init();