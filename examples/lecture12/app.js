/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';

    angular.module('MsgApp', [])
    .controller('MsgController', MsgController)
        .filter('loves', LovesFilter)
        .filter('truth', TruthFilter);


    MsgController.$inject = ['$scope', '$filter', 'lovesFilter']; // Minification protection

    function MsgController($scope, $filter, LovesFilter, TruthFilter) {
        $scope.name="dbourgon";
        $scope.stateOfBeing = 'hungry';
        $scope.cookieCost = .45;


        $scope.sayMessage = function() {
            var msg = "Yaakov likes to eat healthy snacks at night! ";
            return msg; }

        $scope.sayUpperMessage = function() {
            var msg = "Yaakov likes to eat healthy snacks at night! ";
            var output = $filter('uppercase')(msg);
            return output; }

        $scope.sayLoveMessage = function() {
            var msg = "Yaakov likes to eat healthy snacks at night! ";
            return LovesFilter(msg);
            }

        $scope.feed = function()  {
            $scope.stateOfBeing = 'fed';
        };
        /*$scope.upper = function () {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };*/
    }

    function LovesFilter() {
        return function(input){
            input = input || '';
            input = input.replace("likes","loves");
            return input;
        }
    }


    function TruthFilter () {
        return function (input, target, replace) {
            input = input || '';
            return input.replace(target, replace);
        }
    }

})();


//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();
//!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();