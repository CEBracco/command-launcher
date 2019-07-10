function initInstacesExplorer(id) {
    window.instancesTree = $('#'+id).fancytree({
        checkbox: true,
        selectMode: 3,
        source: [
            {
                title: "Universe", folder: true, children: [
                    { title: "laplata" },
                    { title: "bariloche" }
                ]
            }
        ],
        select: function (event, data) {
        }
    });
}

function connect() {
    window.connectedInstances = getSelectedInstances();
    var row = {
        type: 'row',
        content: [{
            type: 'stack',
            content: []
        }]
    }
    for (let i = 0; i < connectedInstances.length; i++) {
        var terminalComponent = {
            type: 'component',
            componentName: 'terminalComponent',
            componentState: { label: connectedInstances[i] }
        }
        row.content[0].content.push(terminalComponent);
    }
    layout.root.contentItems[0].addChild(row);
}

function getSelectedInstances() {
    var instancesSelected = instancesTree.fancytree("getTree").getRootNode().getSelectedNodes();
    return _.map(_.filter(instancesSelected, function (i) { return !i.folder }), function(i){ return i.title });
}