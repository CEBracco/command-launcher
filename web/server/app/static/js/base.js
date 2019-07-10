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
            }
        ]
    }]
};

window.layout = new GoldenLayout(config);
layout.init();