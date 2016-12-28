/**
 * Created by dbourgon on 09/12/2016.
 */


// IIFE
(function(){
'use strict';


angular.module('ShoppingListEventsApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.service('WeightLossFilterService', WeightLossFilterService)
.component('shoppingList', {
    templateUrl: 'template/shoppingList.html',
    controller: ShoppingListComponentController,
    bindings: {
        items: '<',
        myTitle: '@title',
        onRemove: '&'
    }
})
.component('loadingSpinner', {
    templateUrl: 'loading-spinner/template.html',
    controller: SpinnerController
});



SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {
    var $ctrl = this;

    var cancelListener = $rootScope.$on('shoppinglist:processing', function(event, data){
        console.log('Event: ', event);
        console.log('Data: ', data);
        $ctrl.showSpinner = (data.on);
    });

    // LiberacIón de memoria
    $ctrl.$onDestroy = function(){
        cancelListener()
    };
}


ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];
function ShoppingListComponentController($rootScope,$element,$q, WeightLossFilterService){
    var $ctrl = this; // Local variable. Only called $ctrl to match the name that AngularJS will give to it
    var totalItems;

    /**
     *   LifeCycle Controller Functions
     *   ===================================================
     */
    $ctrl.$onInit = function() {
        $ctrl.totalItems = 0;
        console.log(' $onInit() - "this" is: ', $ctrl);
    };

    /**
     * En el parámetro changes se guardarán solamente (observables) las propiedades definidas en el c0mponente
     *  de manera @ o =.
     *  La primera vez, recibe inspección del 1 way binding al producirse un cambio al iniciar, pero depsues ya siempre
     *  verá lo mismo.
     * @param changes
     */
    $ctrl.$onChanges = function (changes) {
        console.log("We are in $onChanges(): ",$ctrl," - Controller changed.", changes);
    };

    // Se ejecutará e cada digest loop
    $ctrl.$doCheck = function () {
        console.log("We are in $doCheck(): ",$ctrl);
        if($ctrl.items.length !== totalItems) {
            totalItems = $ctrl.items.length;

            // Hace un broadcast desde el root, hacia abajo. Esto alertará a los listeners.
            $rootScope.$broadcast('shoppingList:processing', {on: true});
            var promises = [];
            // Recorremos la lista, checkeando el nombre de cada elemento, y recogiendo su promesa.
            for(var i= 0; i < $ctrl.items.length; i++) {
                promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
            }

            // Comprobamos asincronamente y en paralelo las promesas recibidas..
            $q.all(promises)
            .then(function(result){
                HideWarning();
            })
            .catch(function(error){
               ShowWarning();
            })
            .finally(function(){
                console.log('$doCheck - Promesas finalizadas');
                $rootScope.$broadcast('shoppingList:processing', {on:false})
            }) ;
        }
    };

    /**
     * Other functions
     * @param index
     */
    // El param index viene del HTML y creamos el objeto
    $ctrl.remove = function(index) {
        $ctrl.onRemove({index:index})
    };

    function HideWarning() {
        var msg = $element.find('div.error');
        msg.slideUp(500);
    }
    function ShowWarning() {
        var msg = $element.find('div.error');
        msg.slideDown(900);
    }
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

    WeightLossFilterService.$inject =  ['$q','$timeout']
    function WeightLossFilterService ($q, $timeout) {
        var service = this;
        var result = {
            msg: ''
        };
        /** Servicio que comprueba asíncronamente (mediante $q.defer()) si hay galletas
         * o no, en un nombre recibido como param.
         * @return Promise
         * */
        service.checkName = function (name) {
            var deferred = $q.defer();

            $timeout(function(){
                if(name.toLowerCase().indexOf('cookie') === -1) {
                    deferred.resolve(result);
                }else{
                    result.msg = 'Stay away from cookies!';
                    deferred.reject(result);
                }
            },3000);

            return deferred.promise;

        };


        service.checkQuantity = function (qty) {
            var deferred = $q.defer();
            $timeout(function (){
                if(qty < 6) {
                    result.msg ='';
                    deferred.resolve(result);
                }else{
                    result.msg='That\'s too much cookies!';
                    deferred.reject(result);
                }
            }, 500);
            return deferred.promise;
        }



    }
})();


//"use strict";!function(){function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",["$scope","$filter",n])}();
//!function(){"use strict";function n(n,e){n.name="DBourgon",n.upper=function(){var o=e("uppercase");n.name=o(n.name)}}angular.module("DIApp",[]).controller("DIController",n),n.$inject=["$scope","$filter"]}();
