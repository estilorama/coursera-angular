/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
 'use strict';
    angular.module('MsgApp', [])
    .controller('MsgController', MsgController);

    MsgController.$inject = ['$scope']; // Minification protection

    function MsgController($scope) {
        $scope.name="dbourgon";
        $scope.stateOfBeing = 'hungry';

        $scope.sayMessage = function() { return 'Hola pepesito'; }

        $scope.feed = function()  {
            $scope.stateOfBeing = 'fed';
        };
        /*$scope.upper = function () {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };*/
    }

})();


//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();
//!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();