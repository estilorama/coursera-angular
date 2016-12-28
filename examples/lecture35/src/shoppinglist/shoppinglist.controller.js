/**
 * Project: examples -  File: shoppinglist.controller.js
 * Created by dbourgon on 28/12/2016.
 * @author: dbourgon
 */



(function(){
'use strict';

angular.module('ShoppingList').controller('ShoppingListController', ShoppingListController);


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
    };

    // Eliminar...
    list.removeItem = function(itemIdx) {
        console.log(' "this" is: ', this);
        this.lastRemoved = 'Last item removed was '+this.items[itemIdx].name;
        shoppingList.removeItem(itemIdx);
        list.title='Shopping list #1 ('+list.items.length+') item';
    };

}


})();

