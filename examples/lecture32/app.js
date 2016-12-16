/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
'use strict';


    // App...
    angular.module('ShoppingListDirectiveApp', [])

    // Controladores
    .controller('ShoppingListController', ShoppingListController)
    // Factory de servicio
    .factory('ShoppingListFactory', ShoppingListFactory)
    //.directive('listAddItemForm', ListAddItemForm)
        /*
    .directive('listItemDescription', ListItemDescription)
    .directive('listItem', ListItem)*/
    .directive('shoppingList', ShoppingListDirective);




    function ShoppingListDirective () {
        var ddo =  {
            templateUrl: 'template/shoppingList.html',
            scope: {
                items: '<', // 1-way direction binding
                title: '@',
                badRemove: '=',
                onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: ShoppingListDirectiveLink,
            transclude: true // Activa el ng-transclude para esta directiva..
        };

        return ddo;
    }

    function ShoppingListDirectiveLink (scope, element, attrs, controller) {
        console.log('"scope" is: ',scope);
        console.log('"element" is: ',element);
        //console.log('"attrs" is: ',attrs);
        console.log('"controller" is: ',controller);

        scope.$watch('list.cookiesInList()', function(newValue, oldValue)  {
            console.log("Watching cookiesInList()");
            console.log("Old value:", oldValue);
            console.log("New value:", newValue);

            // Else avoided. Toggle Cookie Warnign
            removeCookieWarning();
            if(newValue) displayCookieWarning();


        });


        // Movemos estas funciones dentro de la Link function, para poder tener acceso al element que vamos a manipular
        function displayCookieWarning(){
            // Using AngularJS jqLite
            // var warningElement = element.find('div');
            // console.log(warningElement);
            // warningElement.css('display','block');

            /* Using jQuery included before AngularJS */
            var warningElem = element.find("div.error");
            warningElem.slideDown(900);

        }
        function removeCookieWarning(){
            // Using AngularJS jqLite
            // var warningElement = element.find('div');
            // console.log(warningElement);
            // warningElement.css('display','none');

            /* Using jQuery included before AngularJS */
            /* Using jQuery included before AngularJS */
            var warningElem = element.find("div.error");
            warningElem.slideUp(900);
        }
    }


    function ShoppingListDirectiveController(){
        var list = this;

        console.log('"this" is ', this);

        list.cookiesInList = function () {

            for(var i=0; i < list.items.length; i++) {
                var name = list.items[i].name;
                if(name.toLowerCase().indexOf('cookie') !== -1) {
                    return true;
                }
            }
            return false;
        }

    }



    function ListAddItemForm () {
        var ddo =  {
            templateUrl: 'template/listAddItemForm.html',
            scope: {
                list: '='
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true
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
    ShoppingListController.$inject = ['$timeout', 'ShoppingListFactory']; // Minification protection and injection
    function ShoppingListController($timeout, ShoppingListFactory) {
        var list = this;

        // Lista de la compra (Servicio creado por Factory)
        var shoppingList = ShoppingListFactory();
        // Listado
        list.items = shoppingList.getItems();
        // Añadir
        list.itemName = '';
        list.itemQuantity =  '';
        list.addMessage = '';

        list.title='Shopping list #1 ('+list.items.length+') item';
        list.warning = 'COOKIES DETECTED!!';


        // Añadir a la lista a través del servicio.
        list.addItem = function() {
            list.errorMessage =  '';
            try{
                shoppingList.addItem(list.itemName, list.itemQuantity);
                list.addMessage = 'Added!!';
                list.title='Shopping list #1 ('+list.items.length+') item';

                $timeout(function(){
                    list.addMessage = '';
                },2000);

            }catch(error){
                list.errorMessage = error;
            }

            list.itemName = '';
            list.itemQuantity = '';
        }

        // Eliminar...
        list.removeItem = function(itemIdx) {
            console.log(' "this" is: ', this)
            this.lastRemoved = 'Last item removed was '+this.items[itemIdx].name;

            shoppingList.removeItem(itemIdx);
            list.title='Shopping list #1 ('+list.items.length+') item';
        };

    }

    //
    // /**
    //  * Controlador de List2 (elementos <=3 )
    //  * @type {[*]}
    //  */
    // ShoppingListController2.$inject = ['$timeout', 'ShoppingListFactory']; // Minification protection and injection
    // function ShoppingListController2($timeout, ShoppingListFactory) {
    //     var list2 = this;
    //
    //     // Lista de la compra (Servicio creado por Factory)
    //     var shoppingList = ShoppingListFactory(3);
    //     // Listado
    //     list2.items = shoppingList.getItems();
    //     // Añadir
    //     list2.itemName = '';
    //     list2.itemQuantity =  '';
    //     list2.addMessage = '';
    //
    //     // Añadir a la lista a través del servicio.
    //     list2.addItem = function() {
    //         list2.errorMessage =  '';
    //         try {
    //             shoppingList.addItem(list2.itemName, list2.itemQuantity);
    //             list2.addMessage = 'Added!!';
    //             $timeout(function () {
    //                 list2.addMessage = '';
    //             }, 2000);
    //         }catch(error){
    //             list2.errorMessage = error;
    //         }
    //
    //         list2.itemName = '';
    //         list2.itemQuantity = '';
    //     }
    //
    //     // Eliminar...
    //     list2.removeItem = function(itemIdx) {
    //         shoppingList.removeItem(itemIdx);
    //     };
    //
    // }
    //
    //
    //


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
