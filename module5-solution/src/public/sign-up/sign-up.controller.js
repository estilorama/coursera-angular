/**
 * Project: module5-solution -  File: sign-up.controller.js
 * Created by dbourgon on 10/01/2017.
 * @author: dbourgon
 */

(function(){
'use strict';

    angular.module('public')
    .controller('SignUpController', SignUpController );

    SignUpController.$inject = ['$timeout','MenuService','UserService'];
    function SignUpController ($timeout, MenuService, UserService) {
        var signUpCtrl = this;

        signUpCtrl.user = UserService.getUserInfo();
        signUpCtrl.notValid = false;

        signUpCtrl.submit = function() {

            // ShortName valid, continue ...
            var shortName = signUpCtrl.user.favouriteDish.toLowerCase();

            var validateShortName = MenuService.getMenuItems().then(
            function(response) {
             for(var i= 0; i < response.menu_items.length; i++) {
                    console.log(shortName, response.menu_items[i].short_name.toLowerCase());
                    if(response.menu_items[i].short_name.toLowerCase() === shortName.toLowerCase()) {
                        signUpCtrl.saveData(response.menu_items[i]);
                        break;
                    }
                }
                // ShortName not found, show message ...
                signUpCtrl.notValid = true;
            },
            function(error) {
                // Error, show message ...
                signUpCtrl.notValid = true;
            });
        };


        signUpCtrl.saveData = function(favourite) {

            signUpCtrl.infoSaved = true;
            signUpCtrl.user.favouriteDish = favourite.short_name;

            UserService.setUserInfo(signUpCtrl.user);
            UserService.setUserFavourite(favourite);

            $timeout(function(){
                signUpCtrl.infoSaved = false;
            },3000);

            console.log('Servicio', UserService.getUserInfo());
            console.log('Favorito', UserService.getUserFavourite());
        };


    }


})();