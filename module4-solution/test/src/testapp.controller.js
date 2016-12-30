/**
 * Project: module4-solution -  File: testapp.controller.js
 * Created by dbourgon on 29/12/2016.
 * @author: dbourgon
 */

(function(){
    'use strict';

    angular.module('TestApp')
        .controller('TestAppController', TestAppController);

    TestAppController.$inject = ['MenuDataService'];
    function TestAppController(MenuDataService) {
        var test = this;
        test.categories = MenuDataService.getItemsForCategory('SP');
        console.log(test.categories);
    }
})();