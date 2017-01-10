/**
 * Project: module5-solution -  File: user.service.js
 * Created by dbourgon on 10/01/2017.
 * @author: dbourgon
 */

(function(){
    'use strict';

    angular.module('common')
        .service('UserService', UserService);

    function UserService(){
        var service = this;

        service.isSigned = function() {
            return service.firstName !== undefined &&
            service.lastName !== undefined &&
            service.emailAddress  !== undefined &&
            service.phoneNumber !== undefined &&
            service.favouriteDish!== undefined;
        };

        service.getUserInfo = function () {
            var info = {};
            info.firstName = service.firstName;
            info.lastName = service.lastName;
            info.emailAddress = service.emailAddress ;
            info.phoneNumber = service.phoneNumber;
            info.favouriteDish = service.favouriteDish;
            return info;
        };

        service.setUserInfo = function(info) {
            service.firstName = info.firstName;
            service.lastName = info.lastName;
            service.emailAddress = info.emailAddress ;
            service.phoneNumber = info.phoneNumber;
            service.favouriteDish = info.favouriteDish;
        };

        service.getUserFavourite = function(){
            return service.favourite;
        };

        service.setUserFavourite = function(favourite){
            service.favourite = favourite;
        };

    }
})();