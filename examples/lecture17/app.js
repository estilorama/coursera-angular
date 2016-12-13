/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';

    var shoppingList1 = [
        'Milk', 'Donuts', 'Cookies', 'Chocolate', 'Peanut Butter', 'Pepto Bismol', 'Pepto Bismol (chocolate flavour)', 'Pepto Bismol (Cookie flavour)'
    ];

    var shoppingList2 = [
        { name: 'Milk', quantity: 2 },
        { name: 'Donuts', quantity: 200 },
        { name: 'Cookies', quantity: 300 },
        { name: 'Chocolate', quantity: 5 },
        { name: 'Peanut Butter', quantity: 3 },
        { name: 'Pepto Bismol', quantity: 5 },
        { name: 'Pepto Bismol (chocolate flavour)', quantity: 10 },
        { name: 'Pepto Bismol (Cookie flavour)', quantity: 4 }

    ];

    angular.module('ShoppingListApp', [])
    .controller('ShoppingListController', ShoppingListController);


    ShoppingListController.$inject = ['$scope','$timeout']; // Minification protection

    function ShoppingListController($scope,$timeout) {

        $scope.shoppingList1 = shoppingList1;
        $scope.shoppingList2 = shoppingList2;
        $scope.newItemName = '';
        $scope.newItemQuantity = '';
        $scope.addMessage = '';

        $scope.addNewItem = function() {

            var newItem = {
                name: $scope.newItemName,
                quantity: $scope.newItemQuantity
            };

            shoppingList2.push(newItem);

            $scope.addMessage = 'Added!!';
            $timeout(function(){
                $scope.addMessage = '';
            }, 2000);

            $scope.newItemName = '';
            $scope.newItemQuantity = '';
        }

        /*$scope.showNumberOfWatchers = function () {
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
        }*/

    }

})();


//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();
//!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();
