function initInstacesExplorer(id) {
    $.ajax({
        url: '/hosts',
        contentType: 'application/json',
        type: 'GET'
    }).done(function(hosts){
       renderTree(id, hosts) 
    });
}

function renderTree(id, hosts) {
    window.instancesTree = $('#' + id).fancytree({
        checkbox: true,
        selectMode: 3,
        source: processTreeHosts(hosts),
        select: function (event, data) {
        }
    });
    $('#' + id).closest('.lm_content').css('overflow-y', 'auto');
}

function processTreeHosts(hosts) {
    return _.sortBy(_.map(hosts, function(host){
        return { 
            title: host.name, 
            folder: true,
            children: _.sortBy(_.map(host.instances, function(instance){
                return { title: instance.name }
            }), 'title')
        }
    }), 'title');
}

function connectSelected() {
    window.connectedInstances = getSelectedInstances();
    for (let i = 0; i < connectedInstances.length; i++) {
        connect(connectedInstances[i])
    }
}

function connect(instanceName) {
    var terminalComponent = {
        type: 'component',
        id: `terminal-${Date.now()}-${instanceName}`,
        componentName: 'terminalComponent',
        componentState: { label: `terminal-${Date.now()}-${instanceName}` }
    }
    layout.root.getItemsById('terminalStack')[0].addChild(terminalComponent);
}

function disconnectAll() {
    $.ajax({
        url: '/closeAllConnections',
        contentType: 'application/json',
        type: 'POST'
    });
}

function getSelectedInstances() {
    var instancesSelected = instancesTree.fancytree("getTree").getRootNode().getSelectedNodes();
    return _.map(_.filter(instancesSelected, function (i) { return !i.folder }), function(i){ return i.title });
}

function deselectInstance(instanceName) {
    var instancesSelected = instancesTree.fancytree("getTree").visit(function (i) {
        if(i.title == instanceName){
            i.setSelected(false);
        }
    });
}

function enableInstanceExplorer() {
    $('.btn-disconnect').addClass('hide');
    $('.btn-connect').removeClass('hide');
    $('.instances-tree').fancytree("enable");
}

function disableInstanceExplorer() {
    $('.btn-connect').addClass('hide');
    $('.btn-disconnect').removeClass('hide');
    $('.instances-tree').fancytree("disable");
}

$(document).on('disconnected', function () {
    enableInstanceExplorer();
});

$(document).on('connected', function () {
    disableInstanceExplorer();
});