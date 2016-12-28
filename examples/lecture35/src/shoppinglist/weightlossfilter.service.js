/**
 * Project: examples -  File: weightlossfilter.service.js
 * Created by dbourgon on 28/12/2016.
 * @author: dbourgon
 */


(function(){
'use strict';

angular.module('ShoppingList').service('WeightLossFilterService', WeightLossFilterService);


WeightLossFilterService.$inject =  ['$q','$timeout'];
function WeightLossFilterService ($q, $timeout) {
    var service = this;
    var result = {
        msg: ''
    };
    /** Servicio que comprueba asíncronamente (mediante $q.defer()) si hay galletas
     * o no, en un nombre recibido como param.
     * @return Promise
     * */
    service.checkName = function (name) {
        var deferred = $q.defer();

        $timeout(function(){
            if(name.toLowerCase().indexOf('cookie') === -1) {
                deferred.resolve(result);
            }else{
                result.msg = 'Stay away from cookies!';
                deferred.reject(result);
            }
        },3000);

        return deferred.promise;

    };


    service.checkQuantity = function (qty) {
        var deferred = $q.defer();
        $timeout(function (){
            if(qty < 6) {
                result.msg ='';
                deferred.resolve(result);
            }else{
                result.msg='That\'s too much cookies!';
                deferred.reject(result);
            }
        }, 500);
        return deferred.promise;
    }

}

})();