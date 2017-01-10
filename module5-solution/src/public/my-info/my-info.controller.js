/**
 * Project: module5-solution -  File: my-info.controller.js
 * Created by dbourgon on 10/01/2017.
 * @author: dbourgon
 */

(function(){
'use strict';

    angular.module('public')
    .controller('MyInfoController', MyInfoController );

    MyInfoController.$inject = ['UserService','ApiPath'];
    function MyInfoController (UserService,ApiPath) {
        var myInfoCtrl = this;

        myInfoCtrl.basePath = ApiPath;
        myInfoCtrl.user = UserService.getUserInfo();
        myInfoCtrl.favourite = UserService.getUserFavourite();

        myInfoCtrl.isSigned = function (){
            return UserService.isSigned();
        }
    }


})();