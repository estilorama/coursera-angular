/**
 * Project: module4-solution -  File: breadcrumbs.controller.js
 * Created by dbourgon on 29/12/2016.
 * @author: dbourgon
 */

(function(){
'use strict';

    angular.module('Data')
    .controller('BreadcrumbsController', BreadcrumbsController);

    BreadcrumbsController.$inject = ['categoryName'];
    function BreadcrumbsController (categoryName) {
        var bread = this;
        //console.log(categories);
        bread.categoryName = categoryName;
    }

})();