/**
 * Project: examples -  File: shoppinglist.factory.js
 * Created by dbourgon on 28/12/2016.
 * @author: dbourgon
 */


(function(){
'use strict';

angular.module('ShoppingList').factory('ShoppingListFactory', ShoppingListFactory);

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
        };

        // Devuelve lista de items
        service.getItems = function () {
            return items;
        };

        // Borrar item
        service.removeItem = function(itemIdx) {
            items.splice(itemIdx,1)
        };
    }



})();