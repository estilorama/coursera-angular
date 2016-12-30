/**
 * Project: module4-solution -  File: categories.component.js
 * Created by dbourgon on 29/12/2016.
 * @author: dbourgon
 */


(function(){
'use strict';

    angular.module('Data')
    .component('categoriesList', {
        templateUrl: 'src/menudata/categories/categories.template.html',
        bindings: {
            categories: '<'
        }
    });

})();

