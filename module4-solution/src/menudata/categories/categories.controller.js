/**
 * Project: module4-solution -  File: categories.controller.js
 * Created by dbourgon on 29/12/2016.
 * @author: dbourgon
 */

(function(){
'use strict';

    angular.module('Data')
    .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['categories'];
    function CategoriesController (categories) {
        var catCtrl = this;
        //console.log(categories);
        catCtrl.categories = categories;
    }

})();