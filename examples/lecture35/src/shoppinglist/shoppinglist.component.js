/**
 * Project: examples -  File: shoppinglist.component.js
 * Created by dbourgon on 28/12/2016.
 * @author: dbourgon
 */


(function(){
'use strict';

angular.module('ShoppingList').component('shoppingList', {

        templateUrl: 'template/shoppingList.html',
        controller: ShoppingListComponentController,
        bindings: {
            items: '<',
            myTitle: '@title',
            onRemove: '&'
        }

    });


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




})();



