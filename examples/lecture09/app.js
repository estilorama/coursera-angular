/**
 * Created by dbourgon on 09/12/2016.
 */

/*

// IIFE
(function(){
 'use strict';
    angular.module('DIApp', [])
    .controller('DIController', DIController);

    DIController.$inject = ['$scope','$filter'];
    function DIController($scope, $filter) {
        $scope.name="DBourgon";

        $scope.upper = function () {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };
    }

})();
*/

//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();

!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();