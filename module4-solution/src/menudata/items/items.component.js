/**
 * Project: module4-solution -  File: items.component.js
 * Created by dbourgon on 29/12/2016.
 * @author: dbourgon
 */


(function(){
    'use strict';

    angular.module('Data')
        .component('itemsList', {
            templateUrl: 'src/menudata/items/items.template.html',
            bindings: {
                items: '<',
                category: '<'
            }
        });

})();
