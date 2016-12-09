/**
 * Created by dbourgon on 09/12/2016.
 */

// IIFE
(function(){
 'use strict';

 angular.module('LunchChecker', [])
     .controller('LunchCheckerController', LunchCheckerController);

    LunchCheckerController.$inject = ['$scope'];

    function LunchCheckerController ($scope) {

        // Strings
        var messages = {
            enjoy : 'Enjoy!',
            toomuch : 'Too much!',
            empty: 'Please enter data first'
        };

        // Model vars
        $scope.lunchmenu='';
        $scope.newMessage='';
        $scope.inputClass='';
        $scope.messageClass='';

        // Check the lucnch
        $scope.checkLunch = function () {
            var menu = $scope.lunchmenu;
            var messageId = lunchValue(0);

            if(notEmpty(menu)){
                var arrMenu = createArray(menu);
                messageId = lunchValue(arrMenu.length)
            }
            updateMessage(messageId);
        };


        // Number of dishes message values
        function lunchValue(number) {
            if(number == 0) return 'empty';
            if(number <= 3) return 'enjoy';
            if(number > 3) return 'toomuch';
        }

        // Message view updater..
        function updateMessage (messageId) {

            if(messageId === 'enjoy' || messageId === 'toomuch') {
                $scope.messageClass = 'classOk';
                $scope.inputClass = 'classOk';
            }else{
                $scope.messageClass = 'classKo';
                $scope.inputClass = 'classKo';
            }

            $scope.newMessage = messages[messageId];
        }

        // Split the string and creates an array, avoiding empty elements..
        function createArray(menu){
            var arrMenu = [];
            var arr = menu.split(',');
            for(var i = 0, len= arr.length; i < len; i++) {
                if(notEmpty(arr[i])) arrMenu.push(arr[i]);
            }
            return arrMenu;
        }

        // Check if a string is not empty
        function notEmpty(string) {
            if(string !== '' && string !== undefined && string !== null && string !== false) return true;
            return false;
        }
 };


})();