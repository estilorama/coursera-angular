/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';

    angular.module('CounterApp', [])
    .controller('CounterController', CounterController);




    /*
     CounterController.$inject = ['$scope']; // Minification protection
    function CounterController($scope) {
        $scope.counter = 0;

         // DIGGEST WAY
        $scope.upCounterDiggest = function(){
            setTimeout(function(){
                $scope.counter++;
                console.log('counter incremented');
                $scope.$digest(); // Esto lanza el digest para que Angular pille los cambios
            }, 2000);

        }

         // $APPY WAY
        $scope.upCounterApply = function(){
            setTimeout(function(){
                $scope.$apply(function(){ // Esto lanza el digest pero mantiene tb las excepciones y da mas control a Angular
                    $scope.counter++;
                    console.log('counter incremented');
                });
            }, 2000);
        }
    }*/

    CounterController.$inject = ['$scope','$timeout']; // Minification protection
    function CounterController($scope, $timeout) {
        $scope.counter = 0;

        // $timeout style
        $scope.upCounter = function(){
            $timeout(function(){
                $scope.counter++;
                console.log('counter incremented');
            }, 2000);
        }
    }


})();


//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();
//!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();