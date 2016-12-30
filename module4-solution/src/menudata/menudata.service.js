/**
 * Project: module4-solution -  File: menudata.service.js
 * Created by dbourgon on 29/12/2016.
 * @author: dbourgon
 */

(function(){
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)

    .constant('ApiBaseUrl','https://davids-restaurant.herokuapp.com')
    .constant('CategoriesEndpoint','categories.json')
    .constant('ItemsEndpoint','menu_items.json?category=');


    MenuDataService.$inject = ['$http','$q','ApiBaseUrl','CategoriesEndpoint','ItemsEndpoint'];
    function MenuDataService ($http,$q, ApiBaseUrl, CategoriesEndpoint, ItemsEndpoint) {
        var service = this;

        // Get Categories from API
        service.getAllCategories = function () {

            var deferred = $q.defer();
            $http({
                method:'get',
                url: (ApiBaseUrl + '/' +CategoriesEndpoint)

            }).then(function(success){
                deferred.resolve(success.data);

            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        // Get Items for a Category from API
        service.getItemsForCategory = function(categoryShortName) {
            var deferred = $q.defer();

            $http({
                method:'get',
                url: (ApiBaseUrl + '/' + ItemsEndpoint),
                params: { category: categoryShortName }

            }).then(function(success){
                deferred.resolve(success.data);

            }, function (error) {

                deferred.reject(error);
            });

            return deferred.promise;
        };
    }

})();