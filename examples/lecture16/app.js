/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';

    angular.module('BindingApp', [])
    .controller('BindingController', BindingController);


    BindingController.$inject = ['$scope']; // Minification protection

    function BindingController($scope) {

        $scope.firstName = 'David';
        //$scope.fullName = '';

        $scope.showNumberOfWatchers = function () {
            console.log('# of Watchers:', $scope.$$watchersCount);
        }

        $scope.setFullName = function () {
            $scope.fullName = $scope.firstName  +  ' ' + 'Bourgon Salinero';
        }

        $scope.logFirstName = function() {
            console.log('First name is:  '+$scope.firstName);
        }
        $scope.logFullName = function() {
            console.log('Full name is:  '+$scope.fullName);
        }

    }

})();


//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();
//!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();