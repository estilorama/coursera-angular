/**
 * Created by dbourgon on 09/12/2016.
 */
'use strict';

// IIFE
(function(){

angular.module('nameCalculator', [])

.controller('NameCalculatorController', function($scope) {
    $scope.name="";
    $scope.totalValue=0;

    $scope.displayNumeric = function () {
        var totalNameValue = calculateNumericForString($scope.name);
        $scope.totalValue = totalNameValue;
    }

    function calculateNumericForString(string){
        var total = 0;
        for(var i=0; i < string.length; i++) {
            total += string.charCodeAt(i);
        }
        return total;
    }

});

})();