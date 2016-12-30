/**
 * Project: module4-solution -  File: breadcrumbs.component.js
 * Created by dbourgon on 29/12/2016.
 * @author: dbourgon
 */


(function(){
'use strict';

    angular.module('Data')
    .component('breadCrumbs', {
        templateUrl: 'src/menudata/breadcrumbs/breadcrumbs.template.html',
        controllerAs: '$ctrl',
        bindings: {
            categoryName: '<'
        }
    });

})();

