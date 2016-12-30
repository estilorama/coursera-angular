/**
 * Project: module4-solution -  File: routes.js
 * Created by dbourgon on 29/12/2016.
 * @author: dbourgon
 */

(function () {
'use strict';

    angular.module('MenuApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

            // Home state
            .state('home', {
                url: '',
                templateUrl: 'src/menuapp/template/home.template.html'
            })

            // Categories state
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menuapp/template/categories.template.html',
                controller: 'CategoriesController as catCtrl',
                resolve: {
                    categories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]

                }
            })

            // Items for a category state
            .state('categories.items', {
                url: '/{categoryShortName}/items',
                templateUrl: 'src/menuapp/template/items.template.html',
                controller: 'ItemsController as itemsCtrl',
                resolve: {
                    items: ['$stateParams','MenuDataService',function($stateParams, MenuDataService){
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            });
    }

})();

