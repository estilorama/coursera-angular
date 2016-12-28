/**
 * Created by dbourgon on 09/12/2016.
 */


// IIFE
(function(){
'use strict';


    // App...
    angular.module('ShoppingListComponentApp', [])

    // Controladores
    .controller('ShoppingListController', ShoppingListController)
    // Factory de servicio
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('listAddItemForm', ListAddItemForm)
        /*
    .directive('listItemDescription', ListItemDescription)
    .directive('listItem', ListItem)*/
    .component('shoppingList', {
        templateUrl: 'template/shoppingList.html',
        controller: ShoppingListComponentController,
        bindings: {
            items: '<',
            myTitle: '@title',
            onRemove: '&'
        }
    });

    //ShoppingListComponentController.$inject = ['$scope','$element'];
    //function ShoppingListComponentController($scope,$element){
    ShoppingListComponentController.$inject = ['$element'];
    function ShoppingListComponentController($element){
        var $ctrl = this; // Local variable. Only called $ctrl to match the name that AngularJS will give to it

        // Variable nueva  para probar el $doCheck;
        var totalItems;

        $ctrl.cookiesInList = function () {
            for(var i=0; i < $ctrl.items.length; i++) {
                var name = $ctrl.items[i].name;
                if(name.toLowerCase().indexOf('cookie') !== -1) {
                    return true;
                }
            }
            return false;
        };

        // El param index viene del HTML y creamos el objeto
        $ctrl.remove = function(index) {
            $ctrl.onRemove({index:index})
        };

        /**
         *   LifeCycle Controller Functions
         *   ===================================================
         */
        $ctrl.$onInit = function() {
            console.log("We are in $onInit(). Controller instantiated.");

            // totalItems init...
            $ctrl.totalItems = 0;
        };

        /**
         * En el parámetro changes se guardarán solamente (observables) las propiedades definidas en el c0mponente
         *  de manera @ o =.
         *  La primera vez, recibe inspección del 1 way binding al producirse un cambio al iniciar, pero depsues ya siempre
         *  verá lo mismo.
         * @param changes
         */
        $ctrl.$onChanges = function (changes) {
            console.log("We are in $onChanges(). Controller changed.", changes);
        }

        $ctrl.$doCheck = function () {
            console.log("We are in $onCheck()!");
            if($ctrl.items.length !== totalItems) {
                console.log("# of items changed. Checking for Cookies!");
                totalItems = $ctrl.items.length;

                if($ctrl.cookiesInList()) { console.log("OH NO!! COOKIES!!");
                    ShowWarning();
                }else{ console.log("No Cookies here. Move along.");
                    HideWarning();
                }
            }
        }
        /**
         * Insertar manipulación del DOM. No implica que sea la mejor manera pero..
         *
         */
        function HideWarning() {
            var msg = $element.find('div.error');
            msg.slideUp(500);
        }
        function ShowWarning() {
            var msg = $element.find('div.error');
            msg.slideDown(900);
        }

        /**
         * Función estilo Link de la directiva
         */
        // COEMNTADA AL PROBAR EL LIFECYCL METHOD: $onCheck
        // $ctrl.$postLink = function(){
        //     $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue){
        //
        //         if(newValue) ShowWarning();
        //         else HideWarning();
        //
        //     });
        // }
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
