(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://estilorama-restaurant.heroku.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
