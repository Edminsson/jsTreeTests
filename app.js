angular.module('app', [])
.controller('mainController', function($scope, dataFactory, $timeout) {
    $scope.title = "jsTree tests";
    $scope.nodId = 'j1_2';
    $scope.treeView = null;
    $scope.indexeringPost = {};
    $scope.setIndexeringPost = (res) => {
        console.log('setIndexerinPost was called', res.node);
        $scope.indexeringPost = {id: res.node.id, label: res.node.text};
    }

    $scope.antalToppNoder = 100;

    var treeData = dataFactory.generateTree(2,true);
    $timeout(()=> {
        $('#jstree').jstree({
            plugins: ["addHTML"],
            core : {
                'data' : treeData,
                'themes': {
                    'dots': false,
                    'name': 'proton',
                    'responsive': true
                }

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
        .on('select_node.jstree', function(event, node) {
            console.log('node', node);
            console.log('event', event);
            console.log('$scope',angular.element('#jstree').scope )
            angular.element('#jstree').scope().setIndexeringPost(node);
            angular.element('#jstree').scope().$apply();
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

    $.jstree.plugins.addHTML = function (options, parent) {
        this.redraw_node = function(obj, deep,
                                    callback, force_draw) {
            obj = parent.redraw_node.call(
                this, obj, deep, callback, force_draw
            );
            if (obj) {
                var node = this.get_node(jQuery(obj).attr('id'));
                if (node.data && node.data.kontroll) {
                    jQuery(obj).append('<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>');
                }
            }
            return obj;
        };
    };


});