angular.module('app', [])
.controller('mainController', function($scope, dataFactory, $timeout) {
    $scope.title = "jsTree tests";
    $scope.nodId = 'j1_2';
    $scope.treeView = null;

    $scope.antalToppNoder = 100;

    var treeData = dataFactory.generateTree(2,false);
    $timeout(()=> {
        $('#jstree').jstree({ 'core' : {
            'data' : treeData
            } 
        })
        .on('loaded.jstree', function() {
            console.log('tree was loaded')
            $('#jstree').jstree('open_all');
        })
        .on('refresh.jstree', function() {
            console.log('tree was refreshed')
            $('#jstree').jstree('open_all');
        })
        .on('select_node.jstree', function(node, selected, event) {
            console.log('node', node);
            console.log('selected', selected);
            console.log('event', event);
        });
});

    $scope.getCurrentTree = () => {
        var newTree = dataFactory.generateTree($scope.antalToppNoder,false);
        console.log('number of top nodes', newTree.length);

        $('#jstree').jstree(true).settings.core.data = newTree;
        $('#jstree').jstree(true).refresh();

    };

    $scope.selectNode = (nodId) => {
        console.log('you want to select node ', nodId)
        $('#jstree').jstree('select_node', nodId);
    };

    $scope.changeDefaults = () => {
        console.log('Trying to change defaults');
        $.jstree.defaults.core.themes.variant = "large";
        $('#jstree').jstree();
    };



});