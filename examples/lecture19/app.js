/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';

    angular.module('ControllerInheritanceApp', [])

    .controller('ParentController1', ParentController1)
    .controller('ChildController1', ChildController1)
    .controller('ParentController2', ParentController2)
    .controller('ChildController2', ChildController2);


    ParentController1.$inject  = ['$scope'];
    function ParentController1($scope) {
        $scope.parentValue = 1;
        $scope.pc = this;
        $scope.pc.parentValue = 1;
    }

    ChildController1.$inject = ['$scope'];
    function ChildController1($scope)  {
        // console.log('$scope.parentValue: ', $scope.parentValue);
        // console.log('Child $scope', $scope);
        //
        //
        // $scope.parentValue=5;
        // console.log('*** CHANGED: $scope.parentValue=5  ***');
        // console.log('$scope.parentValue=5', $scope.parentValue);
        // console.log($scope);
        //
        // console.log('$scope.pc.parentValue:', $scope.pc.parentValue);
        //
        // $scope.pc.parentValue = 5;
        // console.log('*** CHANGED: $scope.pc.parentValue=5  ***');
        // console.log('$scope.pc.parentValue: ', $scope.pc.parentValue);
        // console.log($scope);
        //
        // console.log('$scope.$parent.parentValue: ', $scope.$parent.parentValue);

    }


    // ParentController2.$inject = ['$scope']; // Lo eliminamos porque no se necesita
    function ParentController2() {
        var parent = this;
        parent.value = 1;
    }

    ChildController2.$inject = ['$scope'];
    function ChildController2($scope) {
        var child= this;
        child.value = 5;
        console.log('ChildController2 $scope: ', $scope);
    }






})();


//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();
//!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();
