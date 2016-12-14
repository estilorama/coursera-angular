/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';


    // App...
    angular.module('ShoppingListApp', [])

    // Controladores
    .controller('ShoppingListController', ShoppingListController)
    //.controller('ShoppingListController2', ShoppingListController2)
    // Servicio
    //.service('ShoppingListService', ShoppingListService);
    // Factory de servicio
    .factory('ShoppingListFactory', ShoppingListFactory)
    /*.directive('listAddItemForm', ListAddItemForm)
    .directive('listItemDescription', ListItemDescription)
    .directive('listItem', ListItem)*/
    .directive('shoppingList', ShoppingListDirective);




    function ShoppingListDirective () {
        var ddo =  {
            templateUrl: 'template/shoppingList.html',
            scope: {
                items: '<', // 1-way direction binding
                title: '@'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }


    function ShoppingListDirectiveController(){
        var list = this;
        list.cookiesInList = function () {
            for(var i=0; i < list.items.lenght; i++) {
                var name = list.items[i].name;
                if(name.toLowerCase().indexOf('cookie') !== -1) {
                    return true;
                }
                return true;
            }
        }
    }



    function ListAddItemForm () {
        var ddo =  {
            templateUrl: 'template/listAddItemForm.html',
            scope: {
                list: '=myList'
            }
        };
        return ddo;
    }


    // Directive: descripción de elemento de lista
    function ListItemDescription () {
        var ddo = {
            template: '<strong>{{ item.name }}</strong>,  {{ item.quantity }} units '
        };

        return ddo;
    }

    // Directive: descripción de elemento de lista
    function ListItem () {
        var ddo = {
            templateUrl: 'template/listItem.html'
        };

        return ddo;
    }

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

        list1.title='Shopping list #1 ('+list1.items.length+') item';


        // Añadir a la lista a través del servicio.
        list1.addItem = function() {
            list1.errorMessage =  '';
            try{
                shoppingList.addItem(list1.itemName, list1.itemQuantity);
                list1.addMessage = 'Added!!';
                list1.title='Shopping list #1 ('+list1.items.length+') item';

                $timeout(function(){
                    list1.addMessage = '';
                },2000);

            }catch(error){
                list1.errorMessage = error;
            }

            list1.itemName = '';
            list1.itemQuantity = '';
        }

        // Eliminar...
        list1.removeItem = function(itemIdx) {
            shoppingList.removeItem(itemIdx);
            list1.title='Shopping list #1 ('+list1.items.length+') item';
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
            list2.errorMessage =  '';
            try {
                shoppingList.addItem(list2.itemName, list2.itemQuantity);
                list2.addMessage = 'Added!!';
                $timeout(function () {
                    list2.addMessage = '';
                }, 2000);
            }catch(error){
                list2.errorMessage = error;
            }

            list2.itemName = '';
            list2.itemQuantity = '';
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
