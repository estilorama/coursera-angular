/**
 * Project: module4-solution -  File: items.controller.js
 * Created by dbourgon on 29/12/2016.
 * @author: dbourgon
 */

(function(){
'use strict';

    angular.module('Data')
    .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items'];
    function ItemsController (items) {
        var itemsCtrl = this;

        itemsCtrl.items = items.menu_items;
        itemsCtrl.category = items.category;
    }

})();