/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';


    // App...
    angular.module('ShoppingListApp', [])

    // Controladores
    .controller('ShoppingListAddController', ShoppingListAddController)
    .controller('ShoppingListShowController', ShoppingListShowController)
    // Servicio
    .service('ShoppingListService', ShoppingListService);


    /**
     * Servicio
     * @constructor
     */
    function ShoppingListService () {
        var service = this;
        var items = [];

        // Añade un elemento
        service.addItem = function(itemName, itemQuantity) {
            var newItem = {
                name: itemName,
                quantity: itemQuantity
            };
            items.push(newItem);
        }

        // Devuelve lista de items
        service.getItems = function () {
            return items;
        }

        // Borrar item
        service.removeItem = function(itemIdx) {
            items.splice(itemIdx,1)
        }
    }


    /**
     * Controlador de Adicion
     * @type {[*]}
     */
    ShoppingListAddController.$inject = ['$timeout', 'ShoppingListService']; // Minification protection and injection
    function ShoppingListAddController($timeout, ShoppingListService) {
        var itemAdder = this;
        itemAdder.addMessage = '';
        itemAdder.itemName = '';
        itemAdder.itemQuantity =  '';

        // Añadir a la lista a través del servicio.
        itemAdder.addItem = function() {
            ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
            itemAdder.addMessage = 'Added!!';
            $timeout(function(){
                itemAdder.addMessage = '';
            },2000);

            itemAdder.newItemName = '';
            itemAdder.newItemQuantity = '';
        }

    }

    /**
     * Controlador de listado.
     * @type {[*]}
     */
    ShoppingListShowController.$inject = ['ShoppingListService'];
    function ShoppingListShowController (ShoppingListService) {
        var showList = this;
        showList.items = ShoppingListService.getItems();

        showList.removeItem = function(itemIdx) {
          ShoppingListService.removeItem(itemIdx);
        };
    }





})();


//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();
//!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();
