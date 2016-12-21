/**
 * Created by dbourgon on 16/12/2016.
 */

// IIFE
(function() {
    'use strict';

    // Definitions
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .directive('itemsLoadersIndicator', ItemsLoaderIndicatorDirective)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    ///////////////
    // DIRECTIVE:  FoundItemsDirective
    //////////////
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'found-items/found-items.template.html',
            restrict: 'E',
            scope: {
                searching: '<isSearching',
                finished: '<isFinished',
                foundItems: '<myItems',
                onRemove: '&'
            },
            transclude: true
        };
        return ddo;
    }
    ///////////////
    // DIRECTIVE CTRL:  FoundItemsDirective
    //////////////
    function FoundItemsController() {
        var foundItemsCtrl = this;
    }

    ///////////////
    // DIRECTIVE:  ItemsLoaderIndicatorDirective
    //////////////
    function ItemsLoaderIndicatorDirective() {
        var ddo = {
            restrict: 'E',
            scope: {
                show: '<isLoading'
            },
            templateUrl: 'loader/itemsloaderindicator.template.html',
            transclude:true
        };
        return ddo;
    }


    ///////////////
    // SERVICE:     MenuSearchService
    //////////////
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var arrComparableProps = ['name', 'short_name', 'description'];

        // Method getMatchedMenuItems
        // Query the API and manage the results and filtering
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'get',
                url: (ApiBasePath + '/menu_items.json')

            }).then(function (response) {
                return filterDataSet(searchTerm, response.data.menu_items);

            }, function (error) {
                return error;
            });
        };

        // Receives a dataSet and a term, and returns a new dataSet with the elements which contains the "term"
        // in any of its props, defined in arrComparableProps.
        function filterDataSet(term, dataSet) {
            // Validate data ...
            if (dataSet.length == 0) return [];
            if (term === '') return dataSet;

            var filteredData = [];
            for (var i = 0; i < dataSet.length; i++) {
                // If the current element pass
                if (checkStringInElement(term, dataSet[i])) filteredData.push(dataSet[i]);
            }
            // Return the results...
            return filteredData;
        }

        // Receives an element and a term. It cheks if any prop defined in arrComparableProps, contains the term...
        function checkStringInElement(term, element) {
            // I use regular expression for term matching and arrComparableProps definition to seek in element props
            var termRegExp = new RegExp(term.toLowerCase());
            for (var i = 0; i < arrComparableProps.length; i++) {
                var prop = arrComparableProps[i];
                if (termRegExp.test(element[prop].toLowerCase())) return true;
            }
            return false;
        }


    }

    ///////////////
    // CONTROLLER:     NarrowItDownController
    //////////////
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        // Controller attributes...
        ctrl.text = '';
        ctrl.found = [];
        ctrl.searching = false; // Searching... Show/hide the loader...
        ctrl.end = false;       // Search end.

        // Starting the action...
        ctrl.narrowIt = function () {
            ctrl.end = false;
            ctrl.found = [];

            // Text empty, end...
            if (isEmpty(ctrl.text)) {
                ctrl.end = true;
                return;
            }
            // Text Not empty. Continue...
            ctrl.searching = true;
            MenuSearchService.getMatchedMenuItems(ctrl.text)
                .then(function (items) {
                    ctrl.found = items;
                    ctrl.searching = false;
                    ctrl.end = true;
                })
                .catch(function (error) {
                    ctrl.found = [];
                    ctrl.searching = false;
                    ctrl.end = true;
                });
        };

        // Element deletion ...
        ctrl.remove = function (elementIdx) {
            ctrl.found.splice(elementIdx,1);
        };

        // Empty string checker...
        function isEmpty(text) {
            return (text === '');
        }
    }

})();