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

        // onInit
        $ctrl.$onInit = function () {

            // Capture stateChangeStart Event
            var cancel = $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, options){
                    console.log('Spinner Controller','on stateChange START');
                    $ctrl.show();
                });
                cancellers.push(cancel);

            // Capture stateChangeStart Success Event
                cancel = $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    console.log('Spinner Controller','on stateChange SUCCESS');
                    $ctrl.hide();
                });
                cancellers.push(cancel);

            // Capture stateChangeStart ERROR Event
                cancel = $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error){
                    console.log('Spinner Controller','on stateChange ERROR');
                    $ctrl.hide();
                });
                cancellers.push(cancel);
        };

        // Destructor
        $ctrl.$onDestroy = function(){
            cancellers.forEach(function(item){
               item();
            });
        };


        $ctrl.show = function() {
            $ctrl.showSpinner = false;
        };

        $ctrl.hide = function () {
          $ctrl.showSpinner = false;
        };
    }


})();


