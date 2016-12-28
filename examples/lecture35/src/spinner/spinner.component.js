/**
 * Project: examples -  File: spinner.component.js
 * Created by dbourgon on 28/12/2016.
 * @author: dbourgon
 */

(function () {
'use strict';


    angular.module('Spinner').component('loadingSpinner', {
        templateUrl: 'src/spinner/spinner.template.html',
        controller: SpinnerController
    });



    SpinnerController.$inject = ['$rootScope']
    function SpinnerController($rootScope) {
        var $ctrl = this;

        var cancelListener = $rootScope.$on('shoppinglist:processing', function(event, data){
            console.log('Event: ', event);
            console.log('Data: ', data);
            $ctrl.showSpinner = (data.on);
        });

        // LiberacIón de memoria
        $ctrl.$onDestroy = function(){
            cancelListener()
        };
    }


})();


