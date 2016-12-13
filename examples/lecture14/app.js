/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';

    angular.module('CounterApp', [])
    .controller('CounterController', CounterController);


    CounterController.$inject = ['$scope']; // Minification protection

    function CounterController($scope) {
        console.log($scope)
        $scope.onceCounter = 0;
        $scope.counter = 0;

        $scope.showNumberOfWatchers = function () {
            console.log('# of Watchers:', $scope.$$watchersCount);
        }

        $scope.countOnce = function () {
            $scope.onceCounter = 1;
        }

        $scope.upCounter = function(){
            $scope.counter++;
        }

        $scope.$watch('onceCounter', function(newValue, oldValue) {
            console.log('onceCounter Old value', oldValue);
            console.log('onceCounter New value', newValue)
        });

        $scope.$watch('counter', function(newValue, oldValue) {
            console.log('counter Old value', oldValue);
            console.log('counter New value', newValue)
        });


        $scope.$watch(function(){
           console.log('Digest loop fired!!')
        });
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