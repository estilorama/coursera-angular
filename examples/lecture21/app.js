/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';


    // App...
    angular.module('ShoppingListApp', [])

    // Controladores
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    // Servicio
    //.service('ShoppingListService', ShoppingListService);
    // Factory de servicio
    .factory('ShoppingListFactory', ShoppingListFactory);




    /**
     * Controlador de List1 (elementos infinitos)
     * @type {[*]}
     */
    ShoppingListController1.$inject = ['$timeout', 'ShoppingListFactory']; // Minification protection and injection
    function ShoppingListController1($timeout, ShoppingListFactory) {
        var list1 = this;

        // Lista de la compra (Servicio creado por Factory)
        var shoppingList = ShoppingListFactory();
        // Listado
        list1.items = shoppingList.getItems();
        // Añadir
        list1.itemName = '';
        list1.itemQuantity =  '';
        list1.addMessage = '';

        // Añadir a la lista a través del servicio.
        list1.addItem = function() {
            try{
                shoppingList.addItem(list1.itemName, list1.itemQuantity);
                list1.addMessage = 'Added!!';
                $timeout(function(){
                    list1.addMessage = '';
                },2000);
                list1.itemName = '';
                list1.itemQuantity = '';
            }catch(error){
                list1.errorMessage = error;
            }
        }

        // Eliminar...
        list1.removeItem = function(itemIdx) {
            shoppingList.removeItem(itemIdx);
        };

    }


    /**
     * Controlador de List2 (elementos <=3 )
     * @type {[*]}
     */
    ShoppingListController2.$inject = ['$timeout', 'ShoppingListFactory']; // Minification protection and injection
    function ShoppingListController2($timeout, ShoppingListFactory) {
        var list2 = this;

        // Lista de la compra (Servicio creado por Factory)
        var shoppingList = ShoppingListFactory(3);
        // Listado
        list2.items = shoppingList.getItems();
        // Añadir
        list2.itemName = '';
        list2.itemQuantity =  '';
        list2.addMessage = '';

        // Añadir a la lista a través del servicio.
        list2.addItem = function() {
            try {
                shoppingList.addItem(list2.itemName, list2.itemQuantity);
                list2.addMessage = 'Added!!';
                $timeout(function () {
                    list2.addMessage = '';
                }, 2000);
                list2.itemName = '';
                list2.itemQuantity = '';
            }catch(error){
                list2.errorMessage = error;
            }
        }

        // Eliminar...
        list2.removeItem = function(itemIdx) {
            shoppingList.removeItem(itemIdx);
        };

    }





    /**
     * Servicio de Lista de Compra
     * @constructor
     */
    function ShoppingListService (maxItems) {
        var service = this;
        var items = [];

        // Añade un elemento
        service.addItem = function(itemName, itemQuantity) {
            // Si se alcanza el limite... error
            if (maxItems !== undefined && items.length === maxItems) throw new Error('Max items ('+maxItems+') reached!!');
            if(itemName === undefined || itemName ==='' ) throw new Error('Name can not be empty!!');
            if(itemQuantity === undefined || itemQuantity <=0 ) throw new Error('Quantity is not valid!!');

            // No hubo error, continuar...
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
     * Factory del servicio ShoppingList
     * @param maxItems
     * @returns {factory}
     * @constructor
     */
    function ShoppingListFactory(){
        var factory = function(maxItems){
            return new ShoppingListService(maxItems);
        };
        return factory;
    }








})();


//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();
//!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();
