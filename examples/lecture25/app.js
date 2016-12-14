/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';

// App...
angular.module('MenuCategoriesApp', [])

// Controllers ...
.controller('MenuCategoriesController', MenuCategoriesController)
.controller('MenuCategoryController', MenuCategoryController)
.service('MenuCategoriesService',MenuCategoriesService)
.constant('ApiBasePath', 'http://davids-restaurant.herokuapp.com')

;



// Controller
// MenuCategoriesController
MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
    var menu = this;
    menu.categories = [];
    menu.category = {};
    menu.items = [];

    // Recuperar las categorías del servicio ...
    var promise = MenuCategoriesService.getMenuCategories();
    promise.then(function(response){
        menu.categories  = response.data;
    })
    .catch(function(error){
        console.log('Something was terribly wrong.');
    });

    menu.logMenuItems = function(shortName) {
        var promise = MenuCategoriesService.getMenuForCategory(shortName);
        promise.then(function(response){
            menu.category = response.data.category;
            menu.items = response.data.menu_items;
            console.log(response.data);
        })
        .catch(function(){
            console.log(error);
        });
    };
}

MenuCategoryController.$inject = ['MenuCategoriesService'];
function MenuCategoryController()  {
    var category = this;
    category.category = {};
}

// Servicio
MenuCategoriesService.$inject = ['$http','ApiBasePath'];
function MenuCategoriesService ($http,ApiBasePath) {
    var service = this;

    // Get Categories From API
    service.getMenuCategories = function() {
        var response = $http({
            method:'GET',
            url: (ApiBasePath + '/categories.json')
        });
        return response;
    }

    // Get Menu for a Category From API
    service.getMenuForCategory  = function(shortName) {
        var response = $http({
            method: 'GET',
            url: (ApiBasePath + '/menu_items.json'),
            params: { category: shortName }
        });
        return response;
    }
}


})();
