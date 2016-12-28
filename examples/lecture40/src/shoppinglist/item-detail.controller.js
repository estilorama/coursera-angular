/**
 * Project: examples -  File: item-detail.controller.js
 * Created by dbourgon on 28/12/2016.
 * @author: dbourgon
 */

(function(){
    'use strict';

    angular.module('ShoppingList')
        .controller('ItemDetailController', ItemDetailController);

    ItemDetailController.$inject = ['$stateParams','items']
    function ItemDetailController($stateParams, items){

        var itemDetail = this;
        var item = items[$stateParams.itemId];

        itemDetail.name = item.name;
        itemDetail.quantity = item.quantity;
        itemDetail.description = item.description;

    }
    /*
    NOT USING NESTED VIEWS
    ItemDetailController.$inject = ['item'];
    function ItemDetailController(item) {
        var itemdetail = this;
        itemdetail.name = item.name;
        itemdetail.quantity = item.quantity;
        itemdetail.description = item.description;

    }*/
})();