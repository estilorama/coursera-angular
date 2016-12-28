/**
 * Project: examples -  File: spinner.component.js
 * Created by dbourgon on 28/12/2016.
 * @author: dbourgon
 */

(function () {
'use strict';




    angular.module('Spinner')
    .component('loadingSpinner', {
        templateUrl: 'src/spinner/spinner.template.html',
        controller: SpinnerController
    });


    SpinnerController.$inject = ['$rootScope'];
    function SpinnerController($rootScope) {
        var $ctrl = this;
        var cancellers = [];


        $ctrl.$onInit = function () {

            // Capture stateChangeStart Event
            var cancel = $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, options){
                    console.log('Spinner Controller','on stateChange START');
                    $ctrl.showSpinner = true;
                });
                cancellers.push(cancel);

            // Capture stateChangeStart Success Event
                cancel = $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    console.log('Spinner Controller','on stateChange SUCCESS');
                    $ctrl.showSpinner = false;
                });
                cancellers.push(cancel);

            // Capture stateChangeStart ERROR Event
                cancel = $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error){
                    console.log('Spinner Controller','on stateChange ERROR');
                    $ctrl.showSpinner = false;
                });
                cancellers.push(cancel);
        };

       /* var cancelListener = $rootScope.$on('shoppinglist:processing', function(event, data){
            console.log('Event: ', event);
            console.log('Data: ', data);
            $ctrl.showSpinner = (data.on);
        });*/

        // LiberacIón de memoria
        $ctrl.$onDestroy = function(){
            cancellers.forEach(function(item){
               item();
            });
        };
    }


})();


