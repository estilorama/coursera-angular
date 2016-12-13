/**
 * Created by dbourgon on 13/12/2016.
 */
// IIFE

(function(){
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    // Controller: ToBuyController
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController (ShoppingListCheckOffService) {
        var buy = this;
        buy.list = ShoppingListCheckOffService.getToBuyList();

        buy.itemBought = function(itemIdx) {
            ShoppingListCheckOffService.itemBought(itemIdx);
        }
        buy.isEmpty = function () {
            return (ShoppingListCheckOffService.getToBuyList().length == 0)
        }
    }

    // Controller: AlreadyBoughtController
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController (ShoppingListCheckOffService) {
        var bought = this;
        bought.list = ShoppingListCheckOffService.getBoughtList();

        bought.isEmpty = function () {
            return (ShoppingListCheckOffService.getBoughtList().length == 0)
        }
    }

    // Service: ShoppingListCheckOffService
    function ShoppingListCheckOffService () {
        var service = this;

        // toBuyList
        var toBuyList = [
            { name: 'Milk', quantity: 12 },
            { name: 'Eggs', quantity: 24 },
            { name: 'Cookies', quantity: 2 },
            { name: 'Fish', quantity: 4 },
            { name: 'Fruit', quantity: 8 }
        ];
        // boughtList
        var boughtList = [];

        // Get toBuyList
        service.getToBuyList = function() {
            return toBuyList;
        }
        // Item Bought
        service.itemBought = function(itemIdx){
            var bought = toBuyList.splice(itemIdx,1);
            boughtList.push(bought[0]);
        }

        // Get boughtList
        service.getBoughtList = function () {
            return boughtList;
        }
    }

})();



// Minification
// !function(){"use strict";function t(t){var i=this;i.list=t.getToBuyList(),i.itemBought=function(i){t.itemBought(i)},i.isEmpty=function(){return 0==t.getToBuyList().length}}function i(t){var i=this;i.list=t.getBoughtList(),i.isEmpty=function(){return 0==t.getBoughtList().length}}function n(){var t=this,i=[{name:"Milk",quantity:12},{name:"Eggs",quantity:24},{name:"Cookies",quantity:2},{name:"Fish",quantity:4},{name:"Fruit",quantity:8}],n=[];t.getToBuyList=function(){return i},t.itemBought=function(t){var e=i.splice(t,1);n.push(e[0])},t.getBoughtList=function(){return n}}angular.module("ShoppingListCheckOff",[]).controller("ToBuyController",t).controller("AlreadyBoughtController",i).service("ShoppingListCheckOffService",n),t.$inject=["ShoppingListCheckOffService"],i.$inject=["ShoppingListCheckOffService"]}();